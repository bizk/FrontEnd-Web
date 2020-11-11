import React, { useState } from "react";
import history from './../history';
import "./Home.css";
import Navigation from '../components/Navbar';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
function Home (props){  
  const [user, setUser]=useState(props.location.state); 
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
      padding:"2%",
      height:"9rem",
    }
  })); 
  const classes = useStyles();

    return (
      <div className="Home">
        <Navigation user={user}/>
        <div class="container">
        <h3 className={classes.title}>Clientes</h3>
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
    </div>
    );
}
export default Home;