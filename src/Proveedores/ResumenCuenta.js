import React, {useState, useEffect } from 'react';
import { Card} from 'react-bootstrap';
import Navigation from './components/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

function ResumenCuenta (props){
        var today = new Date(),
        date = today.getDate()+ '-' + (today.getMonth() + 1)+ '-' +today.getFullYear();
        const useStyles=makeStyles((theme) => ({
            container: {
              display: 'flex',
              flexWrap: 'wrap',
            },
            textField: {
              marginLeft: theme.spacing(1),
              marginRight: theme.spacing(1),
              marginBottom: theme.spacing(2),
              width: 200,
            },
            modify: {
                padding:10,
            },
            modify1: {
                padding:30,
            },
            button: {
                backgroundColor:"#BF6D3A",
                color:"white",
                marginTop:"15px"
            },
            title:{
                fontStyle:"italic", 
                textAlign:"center",
                marginTop:"15px",
            },
            title1:{
                fontWeight: 'bold',
                textAlign:"left",
                marginTop:"15px"
            }, 
            separator:{
                marginTop:"15px",
                marginBottom:"20px"
            },
            text:{
                fontWeight: 'bold', 
                textAlign:"left",
            },
            table: {
                minWidth: 650,
              },
          }));
          
    const userName = JSON.parse(localStorage.getItem('user'))
    const [cuenta,setCuentas] = useState([])
    const url = 'https://integracion-banco.herokuapp.com/cuentas';
    const [movimientos, setMovimientos] = useState([]);
    const [saldo,setSaldo] = useState('')
	useEffect(() => {
		const fetchData = async () => {
		const result = await axios.get(url, {
		  headers: {
			  Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
		    }
	    })
		  setCuentas(result.data.cuentas)
		} 
	  fetchData()
    },[cuenta]);

    const handleResumen = (index) => {       
      /*   axios.get('https://integracion-banco.herokuapp.com/cuentas/'+(cuenta[index].numero_cuenta)+'/resumen', {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
          }
        })
        .then(function (response) {
              //console.log(response)  
              setSaldo(response.data.cuenta.saldo)
                for (let i = 0; i < response.data.movimientos.length; ++i) {
                //console.log(response.data.movimientos[i]);
                temp.push(response.data.movimientos[i]);
            } 
            console.log(temp)
            setVer(true);
        }) */
        axios.get('https://integracion-banco.herokuapp.com/cuentas/'+(cuenta[index].numero_cuenta)+'/resumen', {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
          }
        })
            .then(function (response) {
                let temp=[];
                setSaldo(response.data.cuenta.saldo)
                for (let i = 0; i < response.data.movimientos.length; ++i) {
                    var tempi=[]
                    tempi.push(response.data.movimientos[i].fecha_creacion, response.data.movimientos[i].concepto, response.data.movimientos[i].cantidad);
                    temp.push(tempi);
                }
                setMovimientos(temp);
                setVer(true);
            })
            .catch(function (error) {
              console.log(error);
            });
    }
          
        const Number = /^[0-9]+$/;
        const[ver,setVer]=useState(false);
        const[displayAhorro, setDisplayAhorro]=useState(false);
        const[displayCorriente, setDisplayCorriente]=useState(false);
        const change = () =>{
           
        }
        const classes = useStyles();
        return (
            <div className="ResumenCuenta">
                <Navigation/>
              {/* <Button onClick={() => console.log(props.location.state)}>Hola</Button>*/}
              <div className={classes.modify}>
            <div><h2 className={classes.title}>Resumen cuenta bancaria</h2></div>
            </div>
            <Card className="col-sm-6 col-md-4 offset-md-4 col-lg-4 offset-lg-4 ml-6">
            <div className={classes.modify}>
            <div className={classes.title1}>
                <h5>Datos de la cuenta: </h5>
                <h7>Nombre: </h7>{userName}<br />
            <div class="container">
            <div class="row">
                <Formik
            initialValues={{
                cuenta: '',
            }}
            validationSchema={Yup.object().shape({
                cuenta: Yup.string()
                    .required('El campo es obligatorio (*)'),
            })}
            onSubmit={fields => {
                console.log(fields.cuenta)
                handleResumen(fields.cuenta)
            }}
            render={({ errors, status, touched }) => (
                <Form>
                <div className="form-group">
                    <label htmlFor="tipo">Seleccione una cuenta</label>
                    <Field as="select"
						name="cuenta"
						onClick={() => change()}
                        className={'form-control' + (errors.cuenta && touched.cuenta? ' is-invalid' : '')}
                    >
                        <option value="" label="Seleccione una cuenta" />
                        {cuenta.map((cuentas,i) => <option key={i} value={i} label={cuentas.numero_cuenta} />)}
                        {/* {displayAhorro &&(<option value="ahorro" label={cuenta[0].numero_cuenta} />)}
                        {displayCorriente && (<option value="corriente" label={cuenta[1].numero_cuenta} />)} */}
                    </Field>
                    <ErrorMessage name="cuenta" component="div" className="invalid-feedback" />
                </div>
                {ver && (<div className={classes.title1}>
                    <h7>Saldo: $</h7> {saldo} <br />
                </div>)}
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-2" style={{backgroundColor: "#BF6D3A", marginTop:"15px"}}>Ver resumen</button>
                    </div>
                </Form>
                )}
            />
            </div>
            </div>
            </div>
            </div>
            </Card>
            <div className={classes.separator}>
            {ver && (<Card className="col-sm-6 col-md-4 offset-md-4 col-lg-6 offset-lg-3 ml-6">
            <div className={classes.modify1}>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="left">Fecha de movimiento</TableCell>
                    <TableCell align="left">Concepto de movimiento</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {movimientos.map((row,i) => ( 
                    <TableRow key={i}>
                    <TableCell align="left">{row[0]}</TableCell>
                    <TableCell align="left">{row[1]}</TableCell>
                    <TableCell align="right">{row[2]}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </div>
            </Card>)}
            </div>
            </div>
        );
    }

export default ResumenCuenta;