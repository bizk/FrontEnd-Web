import React, {useState}from 'react';
import './Navbar.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import AccountCircle from "@material-ui/icons/AccountCircle";
import history from './../history';
import Modal from 'react-bootstrap/Modal';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';

import Logo from "./../LogIn/Assets/Logo.png";
const Navigation = (props) => {
  const[user, setUser]=useState(props.location.state);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      marginLeft:"2%",
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
    modify1: {
        padding:10,
    },
    title:{
        fontStyle:"italic", 
        marginTop:"10px"
    },
    title1:{
        fontWeight: 'bold',
        textAlign:"center",
        marginTop:"5px"
    },
    card:{
      padding:"4%",
      height:"12rem",
    }
  })); 
  const classes = useStyles();
  const onClick= () =>{
    localStorage.clear();
    var userrr = JSON.parse(localStorage.getItem('user'));
    history.push("/")
}
    return (
        <Navbar style={{backgroundColor:"#ffbd59"}}>
            <Navbar.Brand ><img src={Logo} width="60" height="55" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link style={{color:"#BF6D3A"}} onClick={handleShow}>Menú</Nav.Link>
                    <Nav.Link style={{color:"#BF6D3A"}} onClick={() => history.push({
                  pathname: '/Home',
                  state:user })}>Home</Nav.Link>
                </Nav>
                <Nav className="cerrarsesion" style={{textAlign:"right"}}>
    <Nav.Link style={{color:"#825539"}} >{user.nombre} {user.apellido} <AccountCircle /></Nav.Link>
                    <Nav.Link style={{color:"#BF6D3A"}}  onClick={onClick}>Cerrar Sesión</Nav.Link>
                </Nav>
  </Navbar.Collapse>
  <Modal size="lg" size="lg" style={{maxWidth: '1600px'}}show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Menú</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="container">
        <div class="row">
    <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
    <CardActionArea onClick={() =>  history.push({
                  pathname: '/AñadirCliente',
                  state:user })}>
      <div class="card">
      <div className={classes.card}>
        <h6 >Añadir cliente</h6>
        <p>Al seleccionar esta opción se le permitirá añadir un nuevo cliente a nuestro banco completando un formulario.</p>
      </div>
      </div>
      </CardActionArea>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
    <CardActionArea   onClick={() => history.push({
                  pathname: '/ModificarCliente',
                  state:user })}>
      <div class="card">
      <div className={classes.card}>
        <h6 >Modificar cliente</h6>
        <p>Al seleccionar esta opción se le permitirá buscar un cliente y poder modificar algún dato del mismo.</p>
      </div>
      </div>
      </CardActionArea>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
    <CardActionArea   onClick={() => history.push({
                  pathname: '/DeshabilitarCliente',
                  state:user })}>
      <div class="card">
      <div className={classes.card}>
        <h6>Deshabilitar cliente</h6>
        <p >Al seleccionar esta opción se le permitirá buscar y deshabilitar tanto un cliente como la cuenta asociada al mismo.</p>
      </div>
      </div>
      </CardActionArea>
    </div>
  </div>
</div>
<div class="container">
<h3 className={classes.title}>Cuentas</h3>
<div class="row">
  <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
  <CardActionArea   onClick={() => history.push({
                  pathname: '/BuscarCrearCuenta',
                  state:user })}>
      <div class="card">
      <div className={classes.card}>
        <h6 >Crear cuenta bancaria</h6>
        <p >Al seleccionar esta opción se le permitirá crear una cuenta bancaria ya sea "caja de ahorro" o "cuenta corriente" para un cliente nuestro.</p>
      </div>
      </div>
      </CardActionArea>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
    <CardActionArea   onClick={() => history.push({
                  pathname: '/BuscarResumenCuenta',
                  state:user })}>
      <div class="card">
      <div className={classes.card}>
        <h6 >Resumen de cuenta</h6>
        <p >Al seleccionar esta opción podrá tener acceso al resumen de cuenta de uno de nuestros clientes.</p>
      </div>
      </div>
      </CardActionArea>
    </div>
  </div>
<h3 className={classes.title}>Operaciones</h3>
<div class="row">
    <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
    <CardActionArea   onClick={() => history.push({
                  pathname: '/BuscarExtraccionDinero',
                  state:user })}>
      <div class="card" >
      <div className={classes.card}>
        <h6>Extracción de dinero</h6>
        <p>Al seleccionar esta opción se le permitirá registrar una extracción de dinero por parte de un cliente. </p>
      </div>
      </div>
      </CardActionArea>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
    <CardActionArea   onClick={() => history.push({
                  pathname: '/BuscarDepositoDinero',
                  state:user })}>
      <div class="card">
      <div className={classes.card}>
        <h6>Depósito de dinero</h6>
        <p >Al seleccionar esta opción se le permitirá registrar un depósito dinero realizado por parte de un cliente. </p>
      </div>
      </div>
      </CardActionArea>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
    <CardActionArea   onClick={() => history.push({
                  pathname: '/BuscarPagoServicios',
                  state:user })}>
      <div class="card">
      <div className={classes.card}>
        <h6>Pago de servicios/impuestos</h6>
        <p >Al seleccionar esta opción se le permitirá pagar un servicio o impuesto indicando el código de pago electrónico del cliente.</p>
      </div>
      </div>
      </CardActionArea>
    </div>
    </div>
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}  style={{backgroundColor: "#BF6D3A"}}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
        </Navbar>
        
    )
}

export default withRouter(Navigation);