import React, {useState } from 'react';
import Navigation from '../components/Navbar';
import { Button, Card} from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Alert } from '@material-ui/lab';
import history from './../history';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-bootstrap/Modal';

function CrearCuenta (props){
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
        },
        space:{
            marginTop:"15px",
        }
      }));
    const [show, setShow] = useState(false);
    const handleClose = () =>{
         setShow(false);
         history.push({
                pathname: '/BuscarCrearCuenta',
                state:JSON.parse(localStorage.getItem('user')) })
    }
    const handleShow = () => setShow(true);
    const [cuenta,setCuenta]=useState()
    const [cbu, setCbu]= useState("123456789123456789012")
    const [token, setToken] = useState("99939753698000")
    const Number = /^[0-9]+$/;
    const classes = useStyles();
    
        return (
            <div className="Modificar">
                <Navigation />
            <div className={classes.modify}>
                <div><h2 className={classes.title}>Crear cuenta bancaria</h2>
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
                piso:  (cliente.piso),
                date: (cliente.fechanac),
                tipoCuenta: "",
                fondo: "",
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
                tipoCuenta: Yup.string()
                    .required('El campo es obligatorio (*)'), 
                fondo: Yup.string()
                    .matches(Number,'Ingrese únicamente números')
            })}
            onSubmit={fields => {
                if(fields.tipoCuenta=="ahorro"){
                    fields.fondo=""
                }
                setCuenta(fields.tipoCuenta)
            }}
            render={({ errors, status, touched }) => (
                <Card className="col-sm-12 col-md-12 offset-md-2 col-lg-12 offset-lg-2">
                <div className={classes.modify}>
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
                        <label htmlFor="domicilio_ciudad">Ciudad</label>
                        <Field name="domicilio_ciudad" readOnly  type="text" className={'form-control' + (errors.domicilio_ciudad && touched.domicilio_ciudad ? ' is-invalid' : '')} />
                        <ErrorMessage name="domicilio_ciudad" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="domicilio_calle">Domicilio (calle)</label>
                        <Field name="domicilio_calle" readOnly  type="text" className={'form-control' + (errors.domicilio_calle&& touched.domicilio_calle ? ' is-invalid' : '')} />
                        <ErrorMessage name="domicilio_calle" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="domicilio_numero">Altura</label>
                        <Field name="domicilio_numero" readOnly  type="text" className={'form-control' + (errors.domicilio_numero&& touched.domicilio_numero ? ' is-invalid' : '')} />
                        <ErrorMessage name="domicilio_numero" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="piso">Piso/Departamento</label>
                        <Field name="piso" type="text" readOnly  className={'form-control' + (errors.piso && touched.piso? ' is-invalid' : '')} />
                        <ErrorMessage name="piso" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="domicilio_barrio">Barrio</label>
                        <Field name="domicilio_barrio" type="text" readOnly className={'form-control' + (errors.domicilio_barrio&& touched.domicilio_barrio ? ' is-invalid' : '')} />
                        <ErrorMessage name="domicilio_barrio" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Fecha de nacimiento</label>
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
                    <label htmlFor="tipoCuenta" className={classes.space}>Tipo de cuenta</label>
                    <Field as="select"
                        name="tipoCuenta"
                        className={'form-control' + (errors.tipoCuenta && touched.tipoCuenta? ' is-invalid' : '')}
                    >
                        <option value="" label="Seleccione el tipo de cuenta" />
                        <option value="ahorro" label="Caja de ahorro" />
                        <option value="corriente" label="Cuenta corriente" />
                    </Field>
                    <ErrorMessage name="tipoCuenta" component="div" className="invalid-feedback" />
                </div>
               <div className="form-group">
               <label htmlFor="fondo">Fondo descubierto (únicamente para cuenta corriente)</label>
               <Field name="fondo" type="text" className={'form-control' + (errors.fondo && touched.fondo? ' is-invalid' : '')} />
               <ErrorMessage name="fondo" component="div" className="invalid-feedback" />
           </div>
                    <form  className={classes.container} noValidate>
                </form>
                </div>
                    <div className="form-group">
                        <button type="submit" onClick={handleShow} className="btn btn-primary mr-2" style={{backgroundColor: "#BF6D3A", marginTop:"15px"}}>Crear cuenta</button>
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
            <Modal.Title>Cuenta creada</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="success">La cuenta ha sido creada exitosamente </Alert><br />
                Los datos de la cuenta son los siguientes: <br />
                <h7 style={{fontWeight: 'bold'}}>Nombre: </h7>{cliente.nombre}<br />
                <h7 style={{fontWeight: 'bold'}}>Apellido: </h7> {cliente.apellido} <br />
                <h7 style={{fontWeight: 'bold'}}>DNI: </h7>{cliente.dni}<br />
                <h7 style={{fontWeight: 'bold'}}>Tipo de Cuenta: </h7>{cuenta=="ahorro"? "Caja de ahorro" : "Cuenta corriente"}<br />
                <h7 style={{fontWeight: 'bold'}}>CBU: </h7>{cbu}<br />
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

export default CrearCuenta;