import React,{useState} from 'react';
import { Card} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import history from './../history';
import Navigation from '../components/Navbar';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
export default function BuscarDeposito (props){
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
        <h3 className={classes.title}>Depósito de dinero</h3>
        <div class="row m-2 mt-5">
        <div class="col-lg-4 col-md-6 col-sm-12 offset-lg-2 mb-2">
        <CardActionArea   onClick={() => history.push({
                        pathname: '/BuscarDepositoPropio',
                        state:user,
                        })}>
            <div class="card">
            <div className={classes.card}>
                <h6 >Cuenta propia</h6>
                <p >Al seleccionar esta opción se le permitirá depositar dinero en una cuenta propia de un cliente del banco.</p>
            </div>
            </div>
            </CardActionArea>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
            <CardActionArea   onClick={() => history.push({
                        pathname: '/BuscarDepositoTerceros',
                        state:user,
                        })}>
            <div class="card">
            <div className={classes.card}>
                <h6 >Cuenta de terceros</h6>
                <p >Al seleccionar esta opción se le permitirá depositar dinero en una cuenta de terceros.</p>
            </div>
            </div>
            </CardActionArea>
            </div>
        </div>
    </div>
    );
}
