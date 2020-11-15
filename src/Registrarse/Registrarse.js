import React, {useState}  from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Background from "./Register.jpg";
import Logo from "../LogIn/Assets/Logo.png";
import history from './../history';

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
    margin: theme.spacing(9, 9),
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

export default function Registrarse() {
  const classes = useStyles();
  const [user, setUser]=useState();
  const [codigoAutorizacion, setCodigoAutorizacion]=useState();
  const [dni, setDni]=useState();
  const [contraseña, setContraseña]=useState();
  const [contraseñaConfirmar, setNuevaContraseñaConfirmar]=useState();
  const Number = /^[0-9]+$/;
  const Cancel=()=>{
      history.push({
          pathname: '/',
        })
  }
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
            Vamos a Registrarte :)
          </Typography>
          <Formik
                initialValues={{
                    usuario: '',
                    contraseña: '',
                    confirmcontraseña: '',
                    dni:'',
                    codigoAutorizacion:''
                }}
                validationSchema={Yup.object().shape({
                    codigoAutorizacion: Yup.string()
                        .required('El campo es obligatorio (*)'),
                    dni: Yup.string()
                        .required('El campo es obligatorio (*)'),
                    usuario: Yup.string()
                        .required('El campo es obligatorio (*)'),
                    contraseña: Yup.string()
                        .matches(/\w*[a-z]\w*/,  "La contraseña debe tener al menos 1 minúscula")
                        .matches(/\w*[A-Z]\w*/,  "La contraseña debe tener al menos 1 mayúscula")
                        .matches(/\d/, "La contraseña debe tener al menos 1 número")
                        .matches(/[#$%*_=+]/, "La contraseña debe tener al menos 1 símbolo (# $ % * _ = +)")
                        .min(8, ({ min }) => `La contraseña debe ser de al menos ${min} caracteres`)
                        .required('La contraseña es obligatoria'),
                    confirmcontraseña: Yup.string()
                        .oneOf([Yup.ref('contraseña')], 'Las contraseñas no coinciden')
                        .required('La confirmación de contraseña es obligatoria'),
                })}
                onSubmit={fields => {
                  const user={
                    usuario:"ignals",
                    nombre:"Ignacio",
                    apellido:"Matrix",
                }
                setUser(user);
                history.push({
                  pathname: '/',
                })
              }}
                render={({ errors, status, touched, handleChange}) => (
                    <Form>
                      <div className={classes.inputForm}>
                        <div className="form-group">
                            <Field name="codigoAutorizacion" type="text" placeholder="Ingrese el código de autorización" className={'form-control' + (errors.codigoAutorizacion && touched.codigoAutorizacion ? ' is-invalid' : '')} />
                            <ErrorMessage name="codigoAutorizacion" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field name="dni" type="text"  placeholder="DNI" className={'form-control' + (errors.dni && touched.dni ? ' is-invalid' : '')} />
                            <ErrorMessage name="dni" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field name="usuario" type="text" placeholder="Nombre de usuario" className={'form-control' + (errors.usuario && touched.usuario ? ' is-invalid' : '')} />
                            <ErrorMessage name="usuario" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field name="contraseña" type="password"  placeholder="Contraseña" className={'form-control' + (errors.contraseña && touched.contraseña ? ' is-invalid' : '')} />
                            <ErrorMessage name="contraseña" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field name="confirmcontraseña" type="password"  placeholder="Confirmar Contraseña" className={'form-control' + (errors.confirmcontraseña && touched.confirmcontraseña ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmcontraseña" component="div" className="invalid-feedback" />
                        </div>
                        
                      </div>
                        <div className="form-group">
                            <button style={{backgroundColor:"#BF6D3A"}} type="submit" className="btn btn-primary">REGISTRARSE</button>
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
    </Grid>
  );
}