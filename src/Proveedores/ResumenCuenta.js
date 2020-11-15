import React, {useState } from 'react';
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
          function createData(fecha, concepto, cantidad) {
            return { fecha, concepto, cantidad };
          }
          
          const rows = [
            createData("20-11-2020", "Deposito","+ $25.000,00"),
            createData("15-11-2020", "Extraccion","- $15.000,00"),
            createData("03-11-2020", "Pago a proveedor","- $7.500,00"),
          ];
          
        const Number = /^[0-9]+$/;
        const [saldo, setSaldo]=useState(2500);
        const[ver,setVer]=useState(false);
        const cliente={
            nombre: "Ignacio",
            apellido: "Matrix",
            dni: "39753698",
            cuit: "21034698721",
            email:"ignacioals98@hotmail.com",
            domicilio:"Avenida Cordoba 275",
            piso:"13 A",
            fechanac:"1997-05-20",
            preg1: "Primer auto",
            resp1: "mercedes benz a250",
            preg2: "Equipo favorito de fútbol",
            resp2: "River Plate",
            preg3: "Nombre de mascota",
            resp3: "Lola",
            cuentas: {
                cajaahorro:"5565418547654",
                cuentacorriente: "",
            }
            };
        const[displayAhorro, setDisplayAhorro]=useState(false);
        const[displayCorriente, setDisplayCorriente]=useState(false);
        const change = () =>{
            if (cliente.cuentas.cajaahorro ===""){
                setDisplayAhorro(false);
            }else{
                    setDisplayAhorro(true);
            }
            if(cliente.cuentas.cuentacorriente ===""){
                setDisplayCorriente(false);
            }else{
                setDisplayCorriente(true)
            }
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
                <h7>Nombre: </h7>{cliente.nombre}<br />
                <h7>Apellido: </h7> {cliente.apellido} <br />
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
                setVer(true);
                console.log(fields.cuenta)
            }}
            render={({ errors, status, touched }) => (
                <Form>
                <div className="form-group">
                    <label htmlFor="tipo">Seleccione una cuenta</label>
                    <Field as="select"
						name="cuenta"
						onClick={change}
                        className={'form-control' + (errors.cuenta && touched.cuenta? ' is-invalid' : '')}
                    >
                        <option value="" label="Seleccione una cuenta" />
                        {displayAhorro &&(<option value="ahorro" label={cliente.cuentas.cajaahorro} />)}
                        {displayCorriente && (<option value="corriente" label={cliente.cuentas.cuentacorriente} />)}
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
                {rows.map((row) => (
                    <TableRow key={row.fecha}>
                    <TableCell align="left">{row.fecha}</TableCell>
                    <TableCell align="left">{row.concepto}</TableCell>
                    <TableCell align="right">{row.cantidad}</TableCell>
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