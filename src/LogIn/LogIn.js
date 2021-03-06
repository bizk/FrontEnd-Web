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
import Background from "./Assets/banco.jpg";
import { Alert } from '@material-ui/lab';
import Logo from "./Assets/Logo.png";
import history from './../history';
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

export default function LogIn() {
  const classes = useStyles();
  const setBackResponse=useState({});
  const access="x-access-token";
  const [status,setStatus]=useState("");
  const manageUsuario=(data,usuario,contraseña)=>{
    setDisplay(false);
    console.log(data)
    if(data.data.user.rol==="CLIENTE_PERSONA_FISICA"){
      setDisplayPersonas(true);
    }else{
    setDisplayPersonas(false);
    localStorage.setItem('user', JSON.stringify(data.data.user.entidad.apellido));//Guardo el nombre de usuario
    console.log(data.data.user.rol)
    localStorage.setItem('alias', JSON.stringify(data.data.user.rol));//Guardo el rol
    localStorage.setItem('token',JSON.stringify(data.data.user["x-access-token"]));//Guardo el token*/
    console.log(data.data.user["x-access-token"])
    /*localStorage.setItem('userid',JSON.stringify(data.data.user.entidad.id));*/
    history.push({
      pathname: '/Home',
    })
  }
  }
  const [display, setDisplay]=useState(false);
  const [displayPersonas, setDisplayPersonas]=useState(false);
  const handleSignIn = (usuario, contraseña) => {
    const data={"nombre_usuario": usuario,"clave": contraseña}
    axios.post(`https://integracion-banco.herokuapp.com/login`,data)
    .then(function (response) {
      //console.log(response)
      manageUsuario(response,usuario,contraseña);
    })
    .catch(function (error) {
      setDisplay(true);
      console.log(error.message);
    });
  };
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
            Hola, Bienvenid@!
          </Typography>
          <Formik
                initialValues={{
                    usuario: '',
                    contraseña: '',
                }}
                validationSchema={Yup.object().shape({
                    usuario: Yup.string()
                        .required('El campo es obligatorio (*)'),
                    contraseña: Yup.string()
                        .required('El campo es obligatorio (*)'),
                })}
                onSubmit={fields => {
                  const user={
                    usuario:"ignals",
                    nombre:"Ignacio",
                    apellido:"Matrix",
                    contraseña:"123456",
                }
                handleSignIn(fields.usuario, fields.contraseña)
                const user1={
                  usuario:"proveedor",
                  nombre:"Ricardo",
                  apellido:"Manuel",
                  contraseña:"123456",
              }
              }}
                render={({ errors, status, touched, handleChange}) => (
                    <Form>
                      <div className={classes.inputForm}>
                        <div className="form-group">
                            <Field name="usuario" type="text" placeholder="Nombre de usuario" className={'form-control' + (errors.usuario && touched.usuario ? ' is-invalid' : '')} />
                            <ErrorMessage name="usuario" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field name="contraseña" type="password"  placeholder="Contraseña"className={'form-control' + (errors.contraseña && touched.contraseña ? ' is-invalid' : '')} />
                            <ErrorMessage name="contraseña" component="div" className="invalid-feedback" />
                        </div>
                      </div>
                        <div className="form-group">
                        {display && (
                            <Alert severity="error">El usuario o la contraseña son incorrectos.</Alert>)}
                        {displayPersonas && (
                            <Alert severity="error">Las personas físicas no pueden acceder a la aplicación web, utilice nuestra aplicación mobile.</Alert>)}
                            <button style={{backgroundColor:"#BF6D3A"}} type="submit" className="btn btn-primary mt-3 offset-2">INICIAR SESION</button>
                        </div>
                    </Form>
                )}
            />
            <Grid container>
              <Grid item xs>
                <div  className="col-sm-12 col-md-12 offset-md-2 col-lg-12 offset-lg-3 offset-1">
                <Link href="/OlvideContraseña" variant="body2" style={{color:"#BF6D3A"}}>
                  ¿Olvidaste tu contraseña?
                </Link>
                </div>
                <div  className="col-sm-12 col-md-12 offset-md-2 col-lg-12 offset-lg-3 offset-1">
                <Link href="/Registrarse" variant="body2" style={{color:"#BF6D3A"}}>
                  ¿Primera vez que ingresas?
                </Link>
                </div>
              </Grid>
            </Grid>
            <Box mt={15}>
              <Copyright />
            </Box>
        </div>
      </Grid>
    </Grid>
  );
}
