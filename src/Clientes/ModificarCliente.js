import React, {useState } from 'react';
import Navigation from '../components/Navbar';
import { Button, Card} from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import history from './../history';
import { Alert } from '@material-ui/lab';
import Modal from 'react-bootstrap/Modal';
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
        modify: {
            padding:30,
        },
        title:{
            fontStyle:"italic", 
            textAlign:"center",
            marginTop:"30px"
        }
      }));
    const Number = /^[0-9]+$/;
    const classes = useStyles();
    const [show, setShow] = useState(false);
        const handleClose = () =>{
            setShow(false);
            history.push({
                pathname: '/ModificarCliente',
                state:JSON.parse(localStorage.getItem('user')) })
        }
        const handleShow = () => setShow(true);
        return (
            <div className="Modificar">
                <Navigation />
            <div className={classes.modify}>
                <div><h2 className={classes.title}>Modificar cliente</h2>
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
                domicilio_ciudad: (cliente.domicilio_ciudad),
                domicilio_calle: (cliente.domicilio_calle),
                domicilio_numero: (cliente.domicilio_numero),
                domicilio_barrio: (cliente.domicilio_barrio),
                piso: (cliente.piso),
                date: (cliente.fechanac),
                pregunta1:(cliente.preg1),
                respuesta1:(cliente.resp1),
                pregunta2:(cliente.preg2),
                respuesta2:(cliente.resp2),
                pregunta3:(cliente.preg3),
                respuesta3:(cliente.resp3),

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
                domicilio_ciudad:Yup.string()
                .required('El campo es obligatorio (*)'),
                domicilio_calle: Yup.string()
                .required('El campo es obligatorio (*)'),
                domicilio_barrio:Yup.string()
                .required('El campo es obligatorio (*)'),
                domicilio_numero:Yup.string()
                .required('El campo es obligatorio (*)')
                .matches(Number,'Ingrese únicamente números'),
                piso: Yup.string()
                .required('El campo es obligatorio (*)'),
                date: Yup.string()
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
            })}
            onSubmit={fields => {
                alert(JSON.stringify(fields, null, 4))
                setShow(true);
            }}
            render={({ errors, status, touched }) => (
                <Card  className="col-sm-12 col-md-12 offset-md-2 col-lg-12 offset-lg-2">
                <div className={classes.modify}>
                <Form>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre Entidad</label>
                        <Field name="nombre" type="text" className={'form-control' + (errors.nombre && touched.nombre ? ' is-invalid' : '')} />
                        <ErrorMessage name="nombre" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <Field name="apellido" type="text" className={'form-control' + (errors.apellido && touched.apellido ? ' is-invalid' : '')} />
                        <ErrorMessage name="apellido" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dni">DNI</label>
                        <Field name="dni" type="text" readOnly  className={'form-control' + (errors.dni&& touched.dni ? ' is-invalid' : '')} />
                        <ErrorMessage name="dni" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cuit">CUIT</label>
                        <Field name="cuit" type="text" readOnly   className={'form-control' + (errors.cuit && touched.cuit ? ' is-invalid' : '')} />
                        <ErrorMessage name="cuit" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="domicilio_ciudad">Ciudad</label>
                        <Field name="domicilio_ciudad" type="text" className={'form-control' + (errors.domicilio_ciudad && touched.domicilio_ciudad ? ' is-invalid' : '')} />
                        <ErrorMessage name="domicilio_ciudad" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="domicilio_calle">Domicilio (calle)</label>
                        <Field name="domicilio_calle" type="text" className={'form-control' + (errors.domicilio_calle&& touched.domicilio_calle ? ' is-invalid' : '')} />
                        <ErrorMessage name="domicilio_calle" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="domicilio_numero">Altura</label>
                        <Field name="domicilio_numero" type="text" className={'form-control' + (errors.domicilio_numero&& touched.domicilio_numero ? ' is-invalid' : '')} />
                        <ErrorMessage name="domicilio_numero" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="piso">Piso/Departamento</label>
                        <Field name="piso" type="text" className={'form-control' + (errors.piso && touched.piso? ' is-invalid' : '')} />
                        <ErrorMessage name="piso" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="domicilio_barrio">Barrio</label>
                        <Field name="domicilio_barrio" type="text" className={'form-control' + (errors.domicilio_barrio&& touched.domicilio_barrio ? ' is-invalid' : '')} />
                        <ErrorMessage name="domicilio_barrio" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Fecha de nacimiento</label>
                    <form className={classes.container} noValidate>
                <Field
                    name="date"
                    type="date"
                    className={'form-control' + (errors.date && touched.date? ' is-invalid' : '')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <ErrorMessage name="date" component="div" className="invalid-feedback" />
                </form>
                </div>
                <div className="form-group">
                        <label htmlFor="pregunta1">Pregunta de seguridad (1)</label>
                        <Field name="pregunta1" type="text" className={'form-control' + (errors.pregunta1 && touched.pregunta1? ' is-invalid' : '')} />
                        <ErrorMessage name="pregunta1" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="respuesta1">Respuesta (1)</label>
                        <Field name="respuesta1" type="text" className={'form-control' + (errors.respuesta1 && touched.respuesta1? ' is-invalid' : '')} />
                        <ErrorMessage name="respuesta1" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pregunta2">Pregunta de seguridad (2)</label>
                        <Field name="pregunta2" type="text" className={'form-control' + (errors.pregunta2 && touched.pregunta2? ' is-invalid' : '')} />
                        <ErrorMessage name="pregunta2" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="respuesta2">Respuesta (2)</label>
                        <Field name="respuesta2" type="text" className={'form-control' + (errors.respuesta2 && touched.respuesta2? ' is-invalid' : '')} />
                        <ErrorMessage name="respuesta2" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pregunta3">Pregunta de seguridad (3)</label>
                        <Field name="pregunta3" type="text" className={'form-control' + (errors.pregunta3 && touched.pregunta3? ' is-invalid' : '')} />
                        <ErrorMessage name="pregunta3" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="respuesta3">Respuesta (3)</label>
                        <Field name="respuesta3" type="text" className={'form-control' + (errors.respuesta3 && touched.respuesta3? ' is-invalid' : '')} />
                        <ErrorMessage name="respuesta3" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-2" style={{backgroundColor: "#BF6D3A", marginTop:"15px"}}>Guardar cambios</button>
                    </div>
                </Form>
                </div>
                </Card>
            )}
        />
                </div>
            </div>
            </div>
            </div>     
            </div>
            <Modal size="lg" size="lg" style={{maxWidth: '1600px'}}show={show} onHide={handleClose} >
            <Modal.Header closeButton>
            <Modal.Title>Cliente modificado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="success">El cliente ha sido modificado exitosamente</Alert>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}  style={{backgroundColor: "#BF6D3A"}}>
                Cerrar
            </Button>
            </Modal.Footer>
            </Modal>
            </div>
        );
    }

export default ModificarCliente;