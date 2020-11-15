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
import Background from "./Password.jpg";
import Logo from "../../LogIn/Assets/Logo.png";
import history from '../../history';

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
      margin: theme.spacing(1, 15),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(5),
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
const Cancel=()=>{
    history.push({
        pathname: '/',
      })
}

export default function SegundoPaso() {
    const classes = useStyles();
    const [token, setToken]=useState();
    return (
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{backgroundColor:"#ffbd59",}}>
          <div className={classes.paper}>
          <div className="logo">
            <img src={Logo} width="200" height="180" />
          </div>
          <Typography component="h1" variant="h4" style={{color:"white", marginTop:"1px"}}>
            Recuperar contraseña
          </Typography>
            <Formik
                  initialValues={{
                      token: '',
                      pregunta1:'',
                      respuesta1:'',
                      pregunta2:'',
                      respuesta2:'',
                      pregunta3:'',
                      respuesta3:'',
                      contraseña: '',
                      confirmcontraseña:'',          
                  }}
                  validationSchema={Yup.object().shape({
                    token: Yup.string()
                          .required('El campo es obligatorio (*)'),
                    pregunta1: Yup.string()
                          .required('El campo es obligatorio (*)'),
                    respuesta1: Yup.string()
                      .required('El campo es obligatorio (*)'),
                    pregunta2: Yup.string()
                          .required('El campo es obligatorio (*)'),
                    respuesta2: Yup.string()
                      .required('El campo es obligatorio (*)'),
                    pregunta3: Yup.string()
                          .required('El campo es obligatorio (*)'),
                    respuesta3: Yup.string()
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
                    const token={
                      token:(fields.token),
                      pregunta1:(fields.pregunta1),
                      respuesta1:(fields.respuesta1),
                      pregunta2:(fields.pregunta2),
                      respuesta2:(fields.respuesta2),
                      pregunta3:(fields.pregunta3),
                      respuesta3:(fields.respuesta3),
                      contraseña:(fields.contraseña),
                      confirmcontraseña:(fields.confirmcontraseña)
                  }
                  setToken(token);
                  history.push({
                    pathname: '/',
                  })
                }}
                  render={({ errors, status, touched, handleChange}) => (
                      <Form>
                        <div className={classes.inputForm}>
                          <div className="form-group">
                              <Field name="token" type="text" placeholder="Token de seguridad" className={'form-control' + (errors.token && touched.token ? ' is-invalid' : '')} />
                              <ErrorMessage name="token" component="div" className="invalid-feedback" />
                          </div>
                          <div className="form-group">
                        <Field name="pregunta1" type="text" placeholder="Pregunta de seguridad (1)" className={'form-control' + (errors.pregunta1 && touched.pregunta1? ' is-invalid' : '')} />
                        <ErrorMessage name="pregunta1" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <Field name="respuesta1" type="text" placeholder="Respuesta (1)" className={'form-control' + (errors.respuesta1 && touched.respuesta1? ' is-invalid' : '')} />
                        <ErrorMessage name="respuesta1" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <Field name="pregunta2" type="text" placeholder="Pregunta de seguridad (2)"className={'form-control' + (errors.pregunta2 && touched.pregunta2? ' is-invalid' : '')} />
                        <ErrorMessage name="pregunta2" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <Field name="respuesta2" type="text" placeholder="Respuesta (2)"className={'form-control' + (errors.respuesta2 && touched.respuesta2? ' is-invalid' : '')} />
                        <ErrorMessage name="respuesta2" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <Field name="pregunta3" type="text" placeholder="Pregunta de seguridad (3)" className={'form-control' + (errors.pregunta3 && touched.pregunta3? ' is-invalid' : '')} />
                        <ErrorMessage name="pregunta3" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <Field name="respuesta3" type="text" placeholder="Respuesta (3)" className={'form-control' + (errors.respuesta3 && touched.respuesta3? ' is-invalid' : '')} />
                        <ErrorMessage name="respuesta3" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <Field name="contraseña" type="password" placeholder="Nueva contraseña" className={'form-control' + (errors.contraseña&& touched.contraseña? ' is-invalid' : '')} />
                        <ErrorMessage name="contraseña" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <Field name="confirmcontraseña" type="password" placeholder="Repita la nueva contraseña" className={'form-control' + (errors.confirmcontraseña&& touched.confirmcontraseña ? ' is-invalid' : '')} />
                        <ErrorMessage name="confirmcontraseña" component="div" className="invalid-feedback" />
                    </div>
                        </div>
                          <div className="form-group">
                              <button style={{backgroundColor:"#BF6D3A"}} type="submit" className="btn btn-primary">CAMBIAR CONTRASEÑA</button>
                              <button style={{backgroundColor:"#BF6D3A"}} onClick={Cancel} className="btn btn-primary ml-3" >CANCELAR</button>

                          </div>
                      </Form>
                  )}
              />
              <Box mt={5}>
                <Copyright />
              </Box>
          </div>
        </Grid>
      </Grid>
    );
  }