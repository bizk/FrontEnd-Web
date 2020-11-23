import React, {useState, useEffect  } from 'react';
import Navigation from '../components/Navbar';
import {Card, Button} from 'react-bootstrap';
import history from './../history';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import Checkbox from '@material-ui/core/Checkbox';

function PagoServicios (props){
    const [cliente,setCliente] = useState(props.location.state);
    const [codigoPago, setCodigoPago] = useState(props.location.codigoPago);
    console.log(cliente);
    console.log(codigoPago);
    const[pagar,setPagar]=useState([]);
    const [show, setShow] = useState(false);
    const [showno, setShowno] = useState(false);
        const handleClose = () =>{
            setShow(false);
            history.push({
                pathname: '/BuscarPagoServicios',
                state:JSON.parse(localStorage.getItem('user')) })
        }
        const handleClosed = () =>{
            setShow(false);
        }
        const handleShow = () => setShow(true);
    const [facturaState, setFacturaState] = useState([]);
    var miArray = new Array();
    const numRows = facturaState.length
    const numRowss=miArray.length
    const handleChanged = (event) => {
        setChecked(event.target.checked);
      };
    const [display, setDisplay]=useState(false);
    const [displayFac, setDisplayFac]=useState(false);
    const [facturaSelectEstado] = useState([]);
    const [facturasIdPagar] = useState([]);
    var facturasImporte = 0;
    var importeFacturaParse = 0;
    const click = (numero,fact,fecha,importe, index) =>{
        console.log("factura select estado: " + facturaSelectEstado[index])
        if (facturaSelectEstado[index] === false){
            facturaSelectEstado[index] = true
            facturasIdPagar.push(numero);
            importeFacturaParse = parseFloat(importe)
            facturasImporte += importeFacturaParse
        } else if (facturaSelectEstado[index] === true){
            facturaSelectEstado[index] = false
            for( var i = 0; i < facturasIdPagar.length; i++){ 
                if (facturasIdPagar[i] === numero) {
                    facturasIdPagar.splice(i, 1); 
                }
             }
            importeFacturaParse = parseFloat(importe)
            facturasImporte -= importeFacturaParse
        }else if (facturaSelectEstado[index] === undefined){
            facturaSelectEstado[index] = true
            facturasIdPagar.push(numero);
            importeFacturaParse = parseFloat(importe)
            facturasImporte += importeFacturaParse
        }
        console.log("estado checkbox: " + facturaSelectEstado, "ids: " + facturasIdPagar,"importe: " + facturasImporte);
    }

    const pagarServicio = () => {
        console.log(facturasIdPagar)
        const data={"dni":cliente.dni,"facturas_ids": facturasIdPagar, "numero_cuenta": cliente.select.numero_cuenta, "cantidad": facturasImporte}
        axios.post(`https://integracion-banco.herokuapp.com/transacciones/banco/pagar_servicio`,
        data,
        {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
            }
        })
        .then(function (response) {
            console.log(response) 
            setShow(true)
            setShowno(false)
        })
        .catch(function (error) {
            setShowno(true)
            setShow(false)
            console.log(error.message);
        });
    }

    useEffect(() => {
        getFacturas();
      }, []);

      const getFacturas = () => {
         
        axios.get('https://integracion-banco.herokuapp.com/facturas/'+codigoPago+'', {
        headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
          }
        }).then(function (response) {
            let temp=[];
            for (let i = 0; i < response.data.facturas.length; ++i) {
                var tempi=[]
                tempi.push(response.data.facturas[i].id,response.data.facturas[i].numero_factura, response.data.facturas[i].fecha_vencimiento, response.data.facturas[i].importe, response.data.facturas[i].fecha_pagado);
                temp.push(tempi);
            }
        setPagar(temp)
        console.log(pagar)
        })
        .catch(function (error) {
            console.log(error);
     });
    }
    const useStyles = makeStyles((theme) => ({
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
            padding:30,
        },
        title:{
            fontStyle:"italic", 
            textAlign:"center",
            marginTop:"30px"
        },
        title1:{
            fontWeight: 'bold',
            textAlign:"left",
            marginTop:"5px"
        }, 
      }));
    const Number = /^[0-9]+$/;
    const [checked, setChecked] = useState(false);
    const classes = useStyles();
        return (
            <div className="Modificar">
                <Navigation />
            <div className={classes.modify}>
                <div><h2 className={classes.title}>Pago de servicios/impuestos</h2></div>
                <div class="container">
                <Card className="col-sm-6 col-md-4 offset-md-4 col-lg-4 offset-lg-4 ml-6">
                    <div className={classes.modify1}>
                    <div className={classes.title1}>
                        <h4>Cuenta: </h4><h5>{cliente.select.numero_cuenta}</h5>
                        <h4>Su Saldo: </h4><h5>$ {parseFloat(cliente.select.saldo)}</h5>
                        <h4>Código de pago electrónico: </h4><h5>{codigoPago}</h5>
                    </div>
                    </div>
                    {display && (
                                    <Alert severity="error">No cuenta con el dinero suficiente</Alert>)}
                    {displayFac && (
                        <Alert severity="error">Una de las facturas seleccionadas ya se encuentra pagada</Alert>
                    )}
                    <Button onClick={() => pagarServicio()} style ={{backgroundColor:"#BF6D3A", color:"white", marginTop:"15px"}}>Realizar pago</Button>
                </Card>
                <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="left">Seleccione la/s factura/s a pagar</TableCell>
                    <TableCell align="left">Número de factura</TableCell>
                    <TableCell align="left">Fecha de vencimiento / Pago</TableCell>
                    <TableCell align="right">Importe</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {pagar.map((row,i) => (
                    row[4] === null ? 
                    <TableRow  onClick={() => click(row[0], row[1], row[2],row[3], i)} key={row[0]}>
                    <TableCell align="left"><Checkbox /></TableCell>
                    <TableCell align="left">{row[1]}</TableCell>
                    <TableCell align="left">{moment(row[2]).format("DD-MM-YYYY")}</TableCell>
                    <TableCell align="right">${parseFloat(row[3])}</TableCell>
                    </TableRow>
                    : 
                    <TableRow  onClick={() => click(row[0], row[1], row[2],row[3], i)} key={row[0]}>
                    <TableCell align="left"><Checkbox disabled /></TableCell>
                    <TableCell align="left">{row[1]}</TableCell>
                    <TableCell align="left"> Factura pagada el: {moment(row[4]).format("DD-MM-YYYY")}</TableCell>
                    <TableCell align="right">${parseFloat(row[3])}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
                </div>
            </div>
            <Modal size="lg" size="lg" style={{maxWidth: '1600px'}}show={show} onHide={handleClose} >
            <Modal.Header closeButton>
            <Modal.Title>Pago realizado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="success">El pago ha sido realizado exitosamente</Alert>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}  style={{backgroundColor: "#BF6D3A"}}>
                Cerrar
            </Button>
            </Modal.Footer>
            </Modal>
            <Modal size="lg" size="lg" style={{maxWidth: '1600px'}}show={showno} onHide={handleClosed} >
            <Modal.Header closeButton>
            <Modal.Title>Pago NO realizado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="warning">El pago no se ha podido realizar</Alert>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}  style={{backgroundColor: "#BF6D3A"}}>
                Cerrar
            </Button>
            </Modal.Footer>
            </Modal>
            </div>
        );
    }

export default PagoServicios;