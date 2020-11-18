import React, {useState}  from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Paper from "@material-ui/core/Paper";
import { Button} from 'react-bootstrap';
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
export default function SegundoPaso(props) {
    const classes = useStyles();
    const [dni, setDni]=useState(props.location.state);
    const [show, setShow] = useState(false);
    const handleClose = () =>{
      setShow(false);
      history.push({
          pathname: '/Home',
      })
    }
    const [display, setDisplay]=useState(false);
    const handleRecuperar = (token,usuario,contraseña) => {
      console.log(dni)
      console.log(contraseña)
      console.log(usuario)
      console.log(token)
      axios.post('https://integracion-banco.herokuapp.com/recuperar',{
            "dni": dni,
            "nombre_usuario":usuario,
            "clave":contraseña,
            "codigo":token
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
                      usuario:'',
                      contraseña: '',
                      confirmcontraseña:'',          
                  }}
                  validationSchema={Yup.object().shape({
                    token: Yup.string()
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
                    handleRecuperar(fields.token, fields.usuario, fields.contraseña)
                }}
                  render={({ errors, status, touched, handleChange}) => (
                      <Form>
                        <div className={classes.inputForm}>
                          <div className="form-group">
                              <Field name="token" type="text" placeholder="Token de seguridad" className={'form-control' + (errors.token && touched.token ? ' is-invalid' : '')} />
                              <ErrorMessage name="token" component="div" className="invalid-feedback" />
                          </div>
                          <div className="form-group">
                        <Field name="usuario" type="text" placeholder="Nombre de usuario" className={'form-control' + (errors.usuario && touched.usuario? ' is-invalid' : '')} />
                        <ErrorMessage name="usuario" component="div" className="invalid-feedback" />
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
                        {display && (
                                    <Alert severity="error">Ha ocurrido un error.</Alert>)}
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
        <Modal size="lg" size="lg" style={{maxWidth: '1600px'}}show={show} onHide={handleClose} >
            <Modal.Header closeButton>
            <Modal.Title>Recuperar contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="success">Se ha reestablecido correctamente la contraseña.</Alert>
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