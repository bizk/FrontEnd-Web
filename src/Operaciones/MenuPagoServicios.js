import React,{useState} from 'react';
import { Card} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import history from './../history';
import Navigation from '../components/Navbar';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
export default function MenuPagoServicios (props){
    const [user, setUser]=useState(props.location.state);  
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
        modify1: {
            padding:10,
        },
        title:{
            fontStyle:"italic", 
            textAlign:"center",
            marginTop:"30px"
        },
        title1:{
            fontWeight: 'bold',
            textAlign:"center",
            marginTop:"5px"
        }, 
        card:{
            padding:"2%",
            height:"8rem",
          }
      }));
    const classes = useStyles();
    return (
    <div className="BuscarDeposito">
        <Navigation />
        <h3 className={classes.title}>Pago de servicios/Impuestos</h3>
        <div class="row m-2 mt-5">
        <div class="col-lg-4 col-md-6 col-sm-12 offset-lg-2 mb-2">
        <CardActionArea   onClick={() => history.push({
                        pathname: '/PagoServiciosEfectivo',
                        state:user,
                        })}>
            <div class="card">
            <div className={classes.card}>
                <h6 >Efectivo</h6>
                <p >Al seleccionar esta opción se le permitirá abonar un servicio/impuesto utilizando dinero en efectivo.</p>
            </div>
            </div>
            </CardActionArea>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
            <CardActionArea   onClick={() => history.push({
                        pathname: '/BuscarPagoServicios',
                        state:user,
                        })}>
            <div class="card">
            <div className={classes.card}>
                <h6 >Cuenta</h6>
                <p >Al seleccionar esta opción se le permitirá abonar un servicio/impuesto utilizando una cuenta bancaria.</p>
            </div>
            </div>
            </CardActionArea>
            </div>
        </div>
    </div>
    );
}