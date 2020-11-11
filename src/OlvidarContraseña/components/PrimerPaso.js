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
import Background from "../../LogIn/Assets/banco.jpg";
import Logo from "../../LogIn/Assets/Logo.png";

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
    height: "75vh",
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

export default function PrimerPaso() {
    const classes = useStyles();
    const [email, setEmail]=useState();
    return (
      <Grid container justify="center" alignItems="center" component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={8} sm={6} md={8} component={Paper} elevation={6} square style={{backgroundColor:"#ffbd59",}}>
          <div className={classes.paper}>
          <div className="logo">
            <img src={Logo} width="200" height="200" />
          </div>
            <Typography component="h1" variant="h4" style={{color:"white"}}>
              Sigue estos pasos para recuperar tu contraseña
            </Typography>
            <Formik
                  initialValues={{
                      email: '',          
                  }}
                  validationSchema={Yup.object().shape({
                      email: Yup.string()
                          .required('El campo es obligatorio (*)'),
                  })}
                  onSubmit={fields => {
                    const email={
                      email:"usuario@mail.com"
                  }
                  setEmail(email);
                }}
                  render={({ errors, status, touched, handleChange}) => (
                      <Form>
                        <div className={classes.inputForm}>
                          <div className="form-group">
                              <Field name="email" type="text" placeholder="Email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                              <ErrorMessage name="email" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                          <div className="form-group">
                              <button style={{backgroundColor:"#BF6D3A"}} type="submit" className="btn btn-primary">ENVIAR TOKEN</button>
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
  