import React, {useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import Navigation from '../components/Navbar';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import { Router, Switch, Route,Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import history from '../history';
function BuscarCrearCuenta (){
    const [cliente, setCliente]=useState();
        const styles=makeStyles((theme) => ({
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
          }));
        const Number = /^[0-9]+$/;
        return (
            <div className="Modificar">
                <Navigation />
            <div style={{padding: 30 }}>
                <div><h2 style={{fontStyle:"italic", textAlign:"center"}}>Crear cuenta bancaria</h2>
                    <Card style={{ width: '48rem', padding: 30, marginLeft:"310px", height:"auto" }}>
                        <h7 style={{fontWeight: 'bold'}}>Buscar cliente por DNI </h7>
                        <Formik 
                        initialValues={{
                            Buscador: '',
                        }}
                        validationSchema={Yup.object().shape({
                            Buscador: Yup.string()
                                .matches(Number,'Ingrese únicamente números')
                                .required('El campo es obligatorio (*)')
                                .min(7, 'El DNI ingresado no es correcto')
                                .max(8, 'El DNI ingresado no es correcto'),
                        })}
                        onSubmit={fields => {
                            const cliente={
                                nombre: "Ignacio",
                                apellido: "Matrix",
                                dni: "39753698",
                                cuit: "21034698721",
                                email:"ignacioals98@hotmail.com",
                                domicilio:"Avenida Cordoba 275",
                                piso:"13 A",
                                fechanac:"1997-05-20",
                                preg1: "Primer auto",
                                resp1: "mercedes benz a250",
                                preg2: "Equipo favorito de fútbol",
                                resp2: "River Plate",
                                preg3: "Nombre de mascota",
                                resp3: "Lola",
                                cuentas: {
                                    cajaahorro:"5565418547654",
                                    cuentacorriente: "",
                                }
                                };
                            if(cliente.cuentas.cuentacorriente==""){
                                cliente.cuentas.cuentacorriente=" -"
                            }
                            console.log(cliente);
                            setCliente(cliente);
                        }}
                        render={({ errors, status, touched }) => (
                            <Form>
                                <Field name="Buscador" type="text" className={'form-control' + (errors.Buscador && touched.Buscador ? ' is-invalid' : '')} />
                                <ErrorMessage name="Buscador" component="div" className="invalid-feedback" />
                                <button type="submit" className="btn btn-primary mr-2" style={{backgroundColor: "#BF6D3A", marginTop:"5px"}}><SearchIcon /></button>
                            </Form>
                         )}
                        />
                        {cliente && (
                        <div className="nombre" style={{marginTop:"15px"}}>
                            <h7 style={{fontWeight: 'bold'}}>Nombre: </h7>{cliente.nombre}<br />
                            <h7 style={{fontWeight: 'bold'}}>Apellido: </h7> {cliente.apellido} <br />
                            <h7 style={{fontWeight: 'bold'}}>DNI: </h7>{cliente.dni}<br />
                            <h7 style={{fontWeight: 'bold'}}>CUIT: </h7>{cliente.cuit}<br />
                            <h7 style={{fontWeight: 'bold'}}>Cuenta/s: </h7><br /><h7 style={{fontWeight: 'bold'}}>Caja de ahorro: </h7>
                            {cliente.cuentas.cajaahorro}<br /><h7 style={{fontWeight: 'bold'}}>Cuenta corriente: </h7>{cliente.cuentas.cuentacorriente}<br />
                                <Link to={{
                                    pathname: '/CrearCuenta',
                                    state:cliente}}><Button style ={{backgroundColor:"#BF6D3A", color:"white"}} >  Siguiente  </Button></Link>
                         </div>
                        )}
                    </Card>
                </div>
            </div>
            </div>
        );
}
export default BuscarCrearCuenta;