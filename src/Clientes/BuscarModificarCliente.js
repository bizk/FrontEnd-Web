import React, {useState } from 'react';
import { Button, Card} from 'react-bootstrap';
import Navigation from '../components/Navbar';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import {Link } from "react-router-dom";
import { Alert } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
function BuscarModificarCliente (){
    const [cliente, setCliente]=useState();
        const useStyles=makeStyles((theme) => ({
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
            button: {
                backgroundColor:"#BF6D3A",
                color:"white",
                marginTop:"15px"
            },
            title:{
                fontStyle:"italic", 
                textAlign:"center",
                marginTop:"15px",
            },
            title1:{
                fontWeight: 'bold'
            }
          }));
        const Number = /^[0-9]+$/;
        const classes = useStyles();
        const [clienteBuscado,setclienteBuscado]=useState({})
        const [display, setDisplay]=useState(false);
        const manageClienteBuscado = (response) =>{
            console.log(response)
            setclienteBuscado({
                id:response.data.id,
                tipo: response.data.tipo,
                nombre: response.data.nombre,
                apellido: response.data.apellido,
                dni: response.data.dni,
                cuit: response.data.cuit,
                email: response.data.email,
                domicilio_ciudad: response.data.domicilio_ciudad,
                domicilio_calle: response.data.domicilio_calle,
                domicilio_numero: response.data.domicilio_numero,
                domicilio_barrio: response.data.domicilio_barrio,
                domicilio_piso: response.data.domicilio_piso,
                domicilio_apartamento: response.data.domicilio_apartamento,
                fecha_nacimiento: response.data.fecha_nacimiento,
                pregunta1: response.data.pregunta1,
                pregunta1_respuesta: response.data.pregunta1_respuesta,
                pregunta2: response.data.pregunta2,
                pregunta2_respuesta: response.data.pregunta2_respuesta,
                pregunta3: response.data.pregunta3,
                pregunta3_respuesta: response.data.pregunta3_respuesta,
                });
                console.log(clienteBuscado)
                setDisplay(false);
                setCliente(true);
        };
        const manageClienteBuscadoCuit = (response) =>{
            console.log(response)
            setclienteBuscado({
                id:response.data.id,
                tipo: response.data.tipo,
                nombre: response.data.nombre,
                apellido: response.data.apellido,
                dni: response.data.dni,
                cuit: response.data.cuit,
                email: response.data.email,
                domicilio_ciudad: response.data.domicilio_ciudad,
                domicilio_calle: response.data.domicilio_calle,
                domicilio_numero: response.data.domicilio_numero,
                domicilio_barrio: response.data.domicilio_barrio,
                domicilio_piso: response.data.domicilio_piso,
                domicilio_apartamento: response.data.domicilio_apartamento,
                fecha_nacimiento: response.data.fecha_nacimiento,
                pregunta1: response.data.pregunta1,
                pregunta1_respuesta: response.data.pregunta1_respuesta,
                pregunta2: response.data.pregunta2,
                pregunta2_respuesta: response.data.pregunta2_respuesta,
                pregunta3: response.data.pregunta3,
                pregunta3_respuesta: response.data.pregunta3_respuesta,
                });
                console.log(clienteBuscado)
                setDisplay(false);
                setCliente(true);
        };
        const handleBuscarclienteBuscadoCuit= (cuit) => {
            axios.post('https://integracion-banco.herokuapp.com/clientes/cuit', {
              "cuit": cuit
            },{
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
              }
            })
            .then(function (response) {
              //console.log(response)
              manageClienteBuscadoCuit(response);
            })
            .catch(function (error) {
              console.log(error);
              setDisplay(true);
              setCliente(false);
            });
          };
        const handleBuscarclienteBuscado = (dni) => {
            axios.post('https://integracion-banco.herokuapp.com/clientes/dni', {
              "dni": dni
            },{
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
              }
            })
            .then(function (response) {
              //console.log(response)
              manageClienteBuscado(response);
            })
            .catch(function (error) {
              console.log(error);
              setDisplay(true);
              setCliente(false);
            });
          };
        return (
            <div className="Modificar">
                <Navigation />
            <div className={classes.modify}>
                <div><h2 className={classes.title}>Modificar cliente</h2>
                    <Card className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                    <div className={classes.modify}>
                        <h7 className={classes.title1}>Buscar cliente por DNI/CBU/CUIT</h7>
                        <Formik 
                        initialValues={{
                            Buscador: '',
                        }}
                        validationSchema={Yup.object().shape({
                            Buscador: Yup.string()
                                .matches(Number,'Ingrese únicamente números')
                                .required('El campo es obligatorio (*)')
                        })}
                        onSubmit={fields => {
                            if((fields.Buscador).length>6 && (fields.Buscador).length<9){
                                handleBuscarclienteBuscado(fields.Buscador)
                                console.log("dni")
                            }else if((fields.Buscador).length===11){
                                handleBuscarclienteBuscadoCuit(fields.Buscador)
                                console.log("CUIT")
                            }else if((fields.Buscador).length===22){
                                console.log("CBU")
                            }
                        }}
                        render={({ errors, status, touched }) => (
                            <Form>
                                <div class="row">
                                <Field name="Buscador" type="text"  className={'form-control col-sm-5 col-lg-9 ml-3' + (errors.Buscador && touched.Buscador ? ' is-invalid' : '')} />
                                <button type="submit" className="btn btn-primary col-sm-1 col-lg-1 ml-lg-2" style={{backgroundColor:"#BF6D3A",}} ><SearchIcon /></button>
                                <ErrorMessage name="Buscador" component="div" className="invalid-feedback" />
                                {display && (
                                    <Alert severity="error">No se han encontrado resultados</Alert>)}
                                </div>
                            </Form>
                         )}
                        />
                        {cliente && (
                        <div className={classes.title1}>
                            <h7>Nombre: </h7>{clienteBuscado.nombre}<br />
                            <h7>Apellido: </h7> {clienteBuscado.apellido} <br />
                            <h7>DNI: </h7>{clienteBuscado.dni}<br />
                            <h7>CUIT: </h7>{clienteBuscado.cuit}<br />
                                <Link to={{
                                    pathname: '/ModificarClienteBuscado',
                                    state:clienteBuscado}}><Button style={{backgroundColor:"#BF6D3A",color:"white",marginTop:"15px"}} >  Siguiente  </Button></Link>
                         </div>
                        )}
                        </div>
                    </Card>
                </div>
            </div>
            </div>
        );
}
export default BuscarModificarCliente;