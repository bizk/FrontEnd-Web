import React, { useState } from "react";
import history from '../../history';
import "./Home.css";
import Navigation from '../components/Navbar';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
function Home (props){  
  const [user, setUser]=useState(JSON.parse(localStorage.getItem('user'))); 
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
<h3 className={classes.title}>Operaciones</h3>
<div class="row">
    <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
    <CardActionArea   onClick={() => history.push({
                  pathname: '/ResumenCuenta',
                  state:user })}>
      <div class="card" >
      <div className={classes.card}>
        <h6>Resumen de cuenta</h6>
        <p>Al seleccionar esta opción podrá tener acceso al resumen de una de sus cuentas.</p>
      </div>
      </div>
      </CardActionArea>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
    <CardActionArea   onClick={() => history.push({
                  pathname: '/Cobranzas',
                  state:user })}>
      <div class="card">
      <div className={classes.card}>
        <h6>Cobranza de servicios/impuestos</h6>
        <p >Al seleccionar esta opción se le permitirá cargar un archivo con los datos para poder cobrar a los clientes.</p>
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