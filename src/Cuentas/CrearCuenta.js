import React, {useState } from 'react';
import Navigation from '../components/Navbar';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import history from './../history';
import { makeStyles } from '@material-ui/core/styles';

function CrearCuenta (props){
    const [cliente, setCliente]=useState(props.location.state);
    const [tipoCuenta, setTipoCuenta]= useState();
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
      }));
    const Number = /^[0-9]+$/;
    const classes = useStyles();
        return (
            <div className="Modificar">
                <Navigation />
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <div><h2 style={{fontStyle:"italic", textAlign:"center", marginTop:"30px"}}>Crear cuenta bancaria</h2>
                <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-2">
                <Formik
            initialValues={{
                nombre: (cliente.nombre),
                apellido: (cliente.apellido),
                dni: (cliente.dni),
                email: (cliente.email),
                cuit: (cliente.cuit),
                domicilio: (cliente.domicilio),
                piso:  (cliente.piso),
                date: (cliente.fechanac),
                tipoCuenta: (tipoCuenta),
            }}
            validationSchema={Yup.object().shape({
                
                nombre: Yup.string()
                    .required('El campo es obligatorio (*)')
                    .matches(/^[A-Za-z ]*$/,'Ingrese únicamente letras'),
                apellido: Yup.string()
                    .required('El campo es obligatorio (*)')
                    .matches(/^[A-Za-z ]*$/,'Ingrese únicamente letras'),
                email: Yup.string()
                    .email('El email no es válido')
                    .required('El campo es obligatorio (*)'),
                dni: Yup.string()
                    .matches(Number,'Ingrese únicamente números')
                    .required('El campo es obligatorio (*)')
                    .min(7, 'El DNI ingresado no es correcto')
                    .max(8, 'El DNI ingresado no es correcto'),
                cuit: Yup.string()
                .matches(Number,'Ingrese únicamente números')
                .required('El campo es obligatorio (*)')
                .min(11, 'El CUIT ingresado no es correcto')
                .max(11, 'El CUIT ingresado no es correcto'),
                domicilio: Yup.string()
                .required('El campo es obligatorio (*)'),
                piso: Yup.string()
                .required('El campo es obligatorio (*)'),
                date: Yup.string()
                    .required('El campo es obligatorio (*)'),
            })}
            onSubmit={fields => {
                alert(JSON.stringify(fields, null, 4))
            }}
            render={({ errors, status, touched }) => (
                <Card style={{ width: '710px', padding: 30, marginBottom:"20px", marginRight:"350px"}}>
                <Form>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre Entidad</label>
                        <Field name="nombre" type="text" readonly="readonly" className={'form-control' + (errors.nombre && touched.nombre ? ' is-invalid' : '')} />
                        <ErrorMessage name="nombre" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <Field name="apellido" type="text" readonly="readonly" className={'form-control' + (errors.apellido && touched.apellido ? ' is-invalid' : '')} />
                        <ErrorMessage name="apellido" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dni">DNI</label>
                        <Field name="dni" type="text" readonly="readonly" className={'form-control' + (errors.dni&& touched.dni ? ' is-invalid' : '')} />
                        <ErrorMessage name="dni" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cuit">CUIT</label>
                        <Field name="cuit" type="text" readonly="readonly" className={'form-control' + (errors.cuit && touched.cuit ? ' is-invalid' : '')} />
                        <ErrorMessage name="cuit" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="text" readonly="readonly" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="domicilio">Domicilio (calle y número)</label>
                        <Field name="domicilio" type="text" readonly="readonly" className={'form-control' + (errors.domicilio && touched.domicilio ? ' is-invalid' : '')} />
                        <ErrorMessage name="domicilio" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="piso">Piso/Departamento</label>
                        <Field name="piso" type="text" readonly="readonly" className={'form-control' + (errors.piso && touched.piso? ' is-invalid' : '')} />
                        <ErrorMessage name="piso" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Fecha de nacimiento</label>
                    <form  className={classes.container} noValidate>
                <Field
                    readonly="readonly"
                    name="date"
                    type="date"
                    className={'form-control' + (errors.date && touched.date? ' is-invalid' : '')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <ErrorMessage name="date" component="div" className="invalid-feedback" />
                <div className="form-group">
                    <label htmlFor="tipoCuenta" style={{marginTop:"15px"}}>Tipo de cuenta</label>
                    <select
                        name="tipoCuenta"
                        style={{ display: 'block',width:"650px", height:"40px"}}
                        onValueChange={(value) => setTipoCuenta(value)}
                    >
                        <option value="" label="Seleccione el tipo de cuenta" />
                        <option value="ahorro" label="Caja de ahorro" />
                        <option value="corriente" label="Cuenta corriente" />
                    </select>
                </div>
                </form>
                </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-2" style={{backgroundColor: "#BF6D3A", marginTop:"15px"}}>Crear cuenta</button>
                        <button type="reset" className="btn btn-secondary" style={{backgroundColor: "#BF6D3A", marginTop:"15px"}} onClick={() => history.push('/BuscarCrearCuenta')}>Cancelar</button>
                    </div>
                </Form>
                </Card>
            )}
        />
                </div>
            </div>
            </div>
            </div>     
            </div>
            </div>
        );
    }

export default CrearCuenta;