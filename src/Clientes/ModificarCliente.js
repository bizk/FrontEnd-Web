import React, {useState } from 'react';
import Navigation from '../components/Navbar';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import history from './../history';
import { makeStyles } from '@material-ui/core/styles';

function ModificarCliente (props){
    const [cliente, setCliente]=useState(props.location.state);
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
                <div><h2 style={{fontStyle:"italic", textAlign:"center", marginTop:"30px"}}>Modificar cliente</h2>
                <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-2">
                <Formik
            initialValues={{
                Nombre: (cliente.nombre),
                Apellido: (cliente.apellido),
                Dni: (cliente.dni),
                Email: (cliente.email),
                Cuit: (cliente.cuit),
                Domicilio: (cliente.domicilio),
                Piso:  (cliente.piso),
                Date: (cliente.fechanac),
                Pregunta1:(cliente.preg1),
                Respuesta1:(cliente.resp1),
                Pregunta2:(cliente.preg2),
                Respuesta2:(cliente.resp2),
                Pregunta3:(cliente.preg3),
                Respuesta3:(cliente.resp3),

            }}
            validationSchema={Yup.object().shape({
                
                Nombre: Yup.string()
                    .required('El campo es obligatorio (*)')
                    .matches(/^[A-Za-z ]*$/,'Ingrese únicamente letras'),
                Apellido: Yup.string()
                    .required('El campo es obligatorio (*)')
                    .matches(/^[A-Za-z ]*$/,'Ingrese únicamente letras'),
                Email: Yup.string()
                    .email('El email no es válido')
                    .required('El campo es obligatorio (*)'),
                Dni: Yup.string()
                    .matches(Number,'Ingrese únicamente números')
                    .required('El campo es obligatorio (*)')
                    .min(7, 'El DNI ingresado no es correcto')
                    .max(8, 'El DNI ingresado no es correcto'),
                Cuit: Yup.string()
                .matches(Number,'Ingrese únicamente números')
                .required('El campo es obligatorio (*)')
                .min(11, 'El CUIT ingresado no es correcto')
                .max(11, 'El CUIT ingresado no es correcto'),
                Domicilio: Yup.string()
                .required('El campo es obligatorio (*)'),
                Piso: Yup.string()
                .required('El campo es obligatorio (*)'),
                Date: Yup.string()
                    .required('El campo es obligatorio (*)'),
                Pregunta1: Yup.string()
                    .required('El campo es obligatorio (*)'),
                Respuesta1: Yup.string()
                .required('El campo es obligatorio (*)'),
                Pregunta2: Yup.string()
                    .required('El campo es obligatorio (*)'),
                Respuesta2: Yup.string()
                .required('El campo es obligatorio (*)'),
                Pregunta3: Yup.string()
                    .required('El campo es obligatorio (*)'),
                Respuesta3: Yup.string()
                .required('El campo es obligatorio (*)'),
            })}
            onSubmit={fields => {
                alert(JSON.stringify(fields, null, 4))
            }}
            render={({ errors, status, touched }) => (
                <Card style={{ width: '710px', padding: 30, marginBottom:"20px", marginRight:"350px"}}>
                <Form>
                    <div className="form-group">
                        <label htmlFor="Nombre">Nombre Entidad</label>
                        <Field name="Nombre" type="text" className={'form-control' + (errors.Nombre && touched.Nombre ? ' is-invalid' : '')} />
                        <ErrorMessage name="Nombre" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Apellido">Apellido</label>
                        <Field name="Apellido" type="text" className={'form-control' + (errors.Apellido && touched.Apellido ? ' is-invalid' : '')} />
                        <ErrorMessage name="Apellido" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Dni">DNI</label>
                        <Field name="Dni" type="text" className={'form-control' + (errors.Dni&& touched.Dni ? ' is-invalid' : '')} />
                        <ErrorMessage name="Dni" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Cuit">CUIT</label>
                        <Field name="Cuit" type="text"  className={'form-control' + (errors.Cuit && touched.Cuit ? ' is-invalid' : '')} />
                        <ErrorMessage name="Cuit" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Email">Email</label>
                        <Field name="Email" type="text" className={'form-control' + (errors.Email && touched.Email ? ' is-invalid' : '')} />
                        <ErrorMessage name="Email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Domicilio">Domicilio (calle y número)</label>
                        <Field name="Domicilio" type="text" className={'form-control' + (errors.Domicilio && touched.Domicilio ? ' is-invalid' : '')} />
                        <ErrorMessage name="Domicilio" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Piso">Piso/Departamento</label>
                        <Field name="Piso" type="text" className={'form-control' + (errors.Piso && touched.Piso? ' is-invalid' : '')} />
                        <ErrorMessage name="Piso" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Date">Fecha de nacimiento</label>
                    <form className={classes.container} noValidate>
                <Field
                    name="Date"
                    type="date"
                    className={'form-control' + (errors.Date && touched.Date? ' is-invalid' : '')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <ErrorMessage name="Date" component="div" className="invalid-feedback" />
                </form>
                </div>
                <div className="form-group">
                        <label htmlFor="Pregunta1">Pregunta de seguridad (1)</label>
                        <Field name="Pregunta1" type="text" className={'form-control' + (errors.Pregunta1 && touched.Pregunta1? ' is-invalid' : '')} />
                        <ErrorMessage name="Pregunta1" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Respuesta1">Respuesta (1)</label>
                        <Field name="Respuesta1" type="text" className={'form-control' + (errors.Respuesta1 && touched.Respuesta1? ' is-invalid' : '')} />
                        <ErrorMessage name="Respuesta1" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Pregunta2">Pregunta de seguridad (2)</label>
                        <Field name="Pregunta2" type="text" className={'form-control' + (errors.Pregunta2 && touched.Pregunta2? ' is-invalid' : '')} />
                        <ErrorMessage name="Pregunta2" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Respuesta2">Respuesta (2)</label>
                        <Field name="Respuesta2" type="text" className={'form-control' + (errors.Respuesta2 && touched.Respuesta2? ' is-invalid' : '')} />
                        <ErrorMessage name="Respuesta2" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Pregunta3">Pregunta de seguridad (3)</label>
                        <Field name="Pregunta3" type="text" className={'form-control' + (errors.Pregunta3 && touched.Pregunta3? ' is-invalid' : '')} />
                        <ErrorMessage name="Pregunta3" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Respuesta3">Respuesta (3)</label>
                        <Field name="Respuesta3" type="text" className={'form-control' + (errors.Respuesta3 && touched.Respuesta3? ' is-invalid' : '')} />
                        <ErrorMessage name="Respuesta3" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-2" style={{backgroundColor: "#BF6D3A", marginTop:"15px"}}>Guardar cambios</button>
                        <button type="reset" className="btn btn-secondary" style={{backgroundColor: "#BF6D3A", marginTop:"15px"}} onClick={() => history.push('/ModificarCliente')}>Cancelar</button>
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

export default ModificarCliente;