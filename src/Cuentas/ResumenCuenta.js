import React, {useState,useEffect  } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import Navigation from '../components/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import moment from 'moment';

function ResumenCuenta (props){
    const [cliente, setCliente]=useState(props.location.state);
    const [movimientos, setMovimientos] = useState([]);
    useEffect(() => {
          axios.get('https://integracion-banco.herokuapp.com/cuentas/'+(cliente.select.numero_cuenta)+'/resumen', {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
          }
        })
            .then(function (response) {
                let temp=[];
                for (let i = 0; i < response.data.movimientos.length; ++i) {
                    var tempi=[]
                    tempi.push(response.data.movimientos[i].fecha_creacion, response.data.movimientos[i].concepto, response.data.movimientos[i].cantidad);
                    temp.push(tempi);
                }
                setMovimientos(temp);
            })
            .catch(function (error) {
              console.log(error);
            });
    },[]);
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
          
        const Number = /^[0-9]+$/;
        const [saldo, setSaldo]=useState(2500);
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
                <h7>Cuenta:</h7>{cliente.select.numero_cuenta}<br />
                <h7>Saldo: $ </h7><h7 >{cliente.select.saldo} </h7>
            </div>
            </div>
            </Card>
            <div className={classes.separator}>
            <Card className="col-sm-6 col-md-4 offset-md-4 col-lg-6 offset-lg-3 ml-6">
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
                {movimientos.map((row) => (
                    <TableRow key={row.fecha}>
                    <TableCell align="left">{moment(row[0]).format("DD-MM-YYYY")}</TableCell>
                    <TableCell align="left">{row[1]}</TableCell>
                    <TableCell align="right">{row[2]}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </div>
            </Card>
            </div>
            </div>
        );
    }

export default ResumenCuenta;