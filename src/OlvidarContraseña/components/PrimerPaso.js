import React, {useState}  from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button} from 'react-bootstrap';
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Background from "./Password.jpg";
import Logo from "../../LogIn/Assets/Logo.png";
import history from '../../history';
import Modal from 'react-bootstrap/Modal';
import { Alert } from '@material-ui/lab';
import axios from 'axios';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
        Bankame 
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
    image: {
      backgroundImage: `url(${Background})`,
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(9, 15),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(10),
       backgroundImage: `url(${Logo})`,
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor:" #BF6D3A",
    },
    inputForm: {
      marginTop:"30px",
      borderRadius: 10,
      borderColor: 'gray',
      width: '100%'
   }
  }));
const Number = /^[0-9]+$/;
export default function PrimerPaso() {
  const handleClose = () =>{
    setShow(false);
    console.log(dni);
    history.push({
        pathname: '/RecuperarContraseña',
        state:dni,
    })
  }
  const [dni, setDni]=useState();
  const handleEnviar = (dni) => {
    setDni(dni);
    axios.post('https://integracion-banco.herokuapp.com/olvide_mi_clave',{
          "dni": dni,
      },{
          headers: {
              Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
        }
      })
      .then(function (response) {
          setDisplay(false);
          setShow(true);
        })
        .catch(function (error) {
          setDisplay(true);
          console.log(error);
  
        });
      }
  const Cancel=()=>{
      history.push({
          pathname: '/',
        })
  }
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [display, setDisplay]=useState(false);
    return (
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{backgroundColor:"#ffbd59",}}>
          <div className={classes.paper}>
          <div className="logo">
            <img src={Logo} width="200" height="200" />
          </div>
            <Typography component="h1" variant="h4" style={{color:"white"}}>
              Recuperar contraseña
            </Typography>
            <Formik
                  initialValues={{
                      dni: '',          
                  }}
                  validationSchema={Yup.object().shape({
                    dni: Yup.string()
                    .matches(Number,'Ingrese únicamente números')
                    .required('El campo es obligatorio (*)')
                    .min(7, 'El DNI ingresado no es correcto')
                    .max(8, 'El DNI ingresado no es correcto'),
                  })}
                  onSubmit={fields => {
                   handleEnviar(fields.dni)
                }}
                  render={({ errors, status, touched, handleChange}) => (
                      <Form>
                        <div className={classes.inputForm}>
                          <div className="form-group">
                              <Field name="dni" type="text" placeholder="Ingrese su DNI" className={'form-control' + (errors.dni && touched.dni ? ' is-invalid' : '')} />
                              <ErrorMessage name="dni" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        {display && (
                                    <Alert severity="error">Ha ocurrido un error.</Alert>)}
                          <div className="form-group">
                              <button style={{backgroundColor:"#BF6D3A"}} type="submit" className="btn btn-primary" >ENVIAR TOKEN</button>
                              <button style={{backgroundColor:"#BF6D3A"}} onClick={Cancel} className="btn btn-primary ml-3" >CANCELAR</button>
                          </div>
                      </Form>
                  )}
              />
              <Box mt={15}>
                <Copyright />
              </Box>
          </div>
        </Grid>
        <Modal size="lg" size="lg" style={{maxWidth: '1600px'}}show={show} onHide={handleClose} >
            <Modal.Header closeButton>
            <Modal.Title>Recuperar contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="success">Se ha enviado un email con un token de seguridad para recuperar su contraseña.</Alert>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}  style={{backgroundColor: "#BF6D3A"}}>
                Cerrar
            </Button>
            </Modal.Footer>
            </Modal>
      </Grid>
    );
  }