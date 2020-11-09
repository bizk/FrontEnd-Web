import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import history from './../history';
import "./Home.css";
import Navigation from '../components/Navbar';
import CardActionArea from '@material-ui/core/CardActionArea';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Navigation />
        <div class="container" style={{marginLeft:"35px"}} >
        <h3 style={{fontStyle:"italic",marginTop:"10px"}}>Clientes</h3>
  <div class="row">
    <div class="col-md-4">
    <CardActionArea   onClick={() => history.push('/AñadirCliente')}>
      <div class="card card-1" style={{padding:"10px"}}>
        <h6 >Añadir cliente</h6>
        <p>Al seleccionar esta opción se le permitirá añadir un nuevo cliente a nuestro banco completando un formulario.</p>
      </div>
      </CardActionArea>
    </div>
    <div class="col-md-4">
    <CardActionArea   onClick={() => history.push('/ModificarCliente')}>
      <div class="card card-2" style={{padding:"10px"}}>
        <h6 >Modificar cliente</h6>
        <p>Al seleccionar esta opción se le permitirá buscar un cliente y poder modificar algún dato del mismo.</p>
      </div>
      </CardActionArea>
    </div>
    <div class="col-md-4">
    <CardActionArea   onClick={() => history.push('/DeshabilitarCliente')}>
      <div class="card card-3"style={{padding:"10px"}}>
        <h6>Deshabilitar cliente</h6>
        <p >Al seleccionar esta opción se le permitirá buscar y deshabilitar tanto un cliente como la cuenta asociada al mismo.</p>
      </div>
      </CardActionArea>
    </div>
  </div>
</div>
<div class="container2" style={{marginLeft:"50px"}} >
<h3 style={{fontStyle:"italic", marginTop:"10px"}}>Cuentas</h3>
<div class="row">
  <div class="col-md-3">
  <CardActionArea   onClick={() => history.push('/BuscarCrearCuenta')}>
      <div class="card card-4"style={{padding:"10px"}}>
        <h6 >Crear cuenta bancaria</h6>
        <p >Al seleccionar esta opción se le permitirá crear una cuenta bancaria ya sea "caja de ahorro" o "cuenta corriente" para un cliente nuestro.</p>
      </div>
      </CardActionArea>
    </div>
    <div class="col-md-3">
    <CardActionArea   onClick={() => history.push('/BuscarResumenCuenta')}>
      <div class="card card-5" style={{padding:"10px"}}>
        <h6 >Resumen de cuenta</h6>
        <p >Al seleccionar esta opción podrá tener acceso al resumen de cuenta de uno de nuestros clientes.</p>
      </div>
      </CardActionArea>
    </div>
  </div>
<div class="container3">
<h3 style={{fontStyle:"italic",marginTop:"10px"}}>Operaciones</h3>
<div class="row">
    <div class="col-md-3">
    <CardActionArea   onClick={() => history.push('/ExtraccionDinero')}>
      <div class="card card-6"  style={{padding:"10px"}} >
        <h6>Extracción de dinero</h6>
        <p>Al seleccionar esta opción se le permitirá registrar una extracción de dinero por parte de un cliente. </p>
      </div>
      </CardActionArea>
    </div>
    <div class="col-md-3">
    <CardActionArea   onClick={() => history.push('/DepositoDinero')}>
      <div class="card card-7" style={{padding:"10px"}}>
        <h6>Depósito de dinero</h6>
        <p >Al seleccionar esta opción se le permitirá registrar un depósito dinero realizado por parte de un cliente. </p>
      </div>
      </CardActionArea>
    </div>
    <div class="col-md-3">
    <CardActionArea   onClick={() => history.push('/PagoServicios')}>
      <div class="card card-8" style={{padding:"10px"}}>
        <h6>Pago de servicios/impuestos</h6>
        <p >Al seleccionar esta opción se le permitirá pagar un servicio o impuesto indicando el código de pago electrónico del cliente.</p>
      </div>
      </CardActionArea>
    </div>
    </div>
    </div>
    </div>
</div>
    );
  }
}
