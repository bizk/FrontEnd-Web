import React, {useState } from 'react';
import { Button, Card} from 'react-bootstrap';
import Navigation from '../components/Navbar';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import { Alert } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import history from '../history';
import axios from 'axios';

function BuscarPagoServicios(props){
    const [cliente, setCliente]=useState();
    const [user, setUser]=useState(props.location.state);  
    const [client,setClient]=useState(false);
    const [currentAccount, setCurrentAccount] = useState();
    const [selectAccount, setSelectedAccount] = useState("");
    const [clienteBuscado,setclienteBuscado]=useState({});
    const [facturas, setFacturas] = useState([])
    const onClick = () =>{
        if(selectAccount===""){
            setDisplayAccount(true);
        }else if(codigoPago===""){
            setDisplayVerificar(true);
        }else{
            history.push({
                pathname:"/PagoServicios",
                state: clienteBuscado,
                facturasObtenidas: facturas,
                codigoPago: codigoPago,
            })
        }
    }
    const changeAccount = (newAccount) => {
        console.log(newAccount)
        if(newAccount!==""){
            setDisplayAccount(false);
        if(clienteBuscado.cuentas.c1.numero_cuenta===newAccount){
            setclienteBuscado({
                id:clienteBuscado.id,
                nombre: clienteBuscado.nombre,
                apellido: clienteBuscado.apellido,
                dni: clienteBuscado.dni,
                cuit: clienteBuscado.cuit,
                email: clienteBuscado.email,
                domicilio_ciudad: clienteBuscado.domicilio_ciudad,
                domicilio_calle: clienteBuscado.domicilio_calle,
                domicilio_numero: clienteBuscado.domicilio_numero,
                domicilio_barrio: clienteBuscado.domicilio_barrio,
                domicilio_piso: clienteBuscado.domicilio_piso,
                domicilio_apartamento: clienteBuscado.domicilio_apartamento,
                fecha_nacimiento: clienteBuscado.fecha_nacimiento,
                pregunta1: clienteBuscado.pregunta1,
                pregunta1_respuesta: clienteBuscado.pregunta1_respuesta,
                pregunta2: clienteBuscado.pregunta2,
                pregunta2_respuesta: clienteBuscado.pregunta2_respuesta,
                pregunta3: clienteBuscado.pregunta3,
                pregunta3_respuesta: clienteBuscado.pregunta3_respuesta,
                cuentas:{
                    c1:clienteBuscado.cuentas.c1,
                    c2:clienteBuscado.cuentas.c2,
                },
                select: clienteBuscado.cuentas.c1,
                });
        }else{
        setclienteBuscado({
            id:clienteBuscado.id,
                nombre: clienteBuscado.nombre,
                apellido: clienteBuscado.apellido,
                dni: clienteBuscado.dni,
                cuit: clienteBuscado.cuit,
                email: clienteBuscado.email,
                domicilio_ciudad: clienteBuscado.domicilio_ciudad,
                domicilio_calle: clienteBuscado.domicilio_calle,
                domicilio_numero: clienteBuscado.domicilio_numero,
                domicilio_barrio: clienteBuscado.domicilio_barrio,
                domicilio_piso: clienteBuscado.domicilio_piso,
                domicilio_apartamento: clienteBuscado.domicilio_apartamento,
                fecha_nacimiento: clienteBuscado.fecha_nacimiento,
                pregunta1: clienteBuscado.pregunta1,
                pregunta1_respuesta: clienteBuscado.pregunta1_respuesta,
                pregunta2: clienteBuscado.pregunta2,
                pregunta2_respuesta: clienteBuscado.pregunta2_respuesta,
                pregunta3: clienteBuscado.pregunta3,
                pregunta3_respuesta: clienteBuscado.pregunta3_respuesta,
                cuentas:{
                    c1:clienteBuscado.cuentas.c1,
                    c2:clienteBuscado.cuentas.c2,
                },
                select: clienteBuscado.cuentas.c2,
            });
        }
        setSelectedAccount(newAccount)
    }else{
        setDisplayAccount(true);
    }
    }
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
        },
        title2:{
            marginLeft:"15px"
        }
      }));
    const Number = /^[0-9]+$/;
    const classes = useStyles();
    const [display, setDisplay]=useState(false);
    const[displayVerificar, setDisplayVerificar]=useState(false);
    const[displayAccount, setDisplayAccount]=useState(false);
    const[codigoPago,setCodigoPago]=useState("");
    const manageClienteBuscado = (response) =>{
        if(response.data.cliente.cuentas[0]===undefined){
            setDisplay(true); 
        }else
        console.log(response.data.cliente.cuentas[1])
        if(response.data.cliente.cuentas[1]===undefined){
            setDisplayCajaahorro(false);
        setclienteBuscado({
            id:response.data.cliente.id,
            nombre: response.data.cliente.nombre,
            apellido: response.data.cliente.apellido,
            dni: response.data.cliente.dni,
            cuit: response.data.cliente.cuit,
            email: response.data.cliente.email,
            domicilio_ciudad: response.data.cliente.domicilio_ciudad,
            domicilio_calle: response.data.cliente.domicilio_calle,
            domicilio_numero: response.data.cliente.domicilio_numero,
            domicilio_barrio: response.data.cliente.domicilio_barrio,
            domicilio_piso: response.data.cliente.domicilio_piso,
            domicilio_apartamento: response.data.cliente.domicilio_apartamento,
            fecha_nacimiento: response.data.cliente.fecha_nacimiento,
            pregunta1: response.data.cliente.pregunta1,
            pregunta1_respuesta: response.data.cliente.pregunta1_respuesta,
            pregunta2: response.data.cliente.pregunta2,
            pregunta2_respuesta: response.data.cliente.pregunta2_respuesta,
            pregunta3: response.data.cliente.pregunta3,
            pregunta3_respuesta: response.data.cliente.pregunta3_respuesta,
            cuentas:{
                c1:response.data.cliente.cuentas[0],
            }
            });
        }else{
            setDisplayCajaahorro(true);
            setclienteBuscado({
                id:response.data.cliente.id,
                nombre: response.data.cliente.nombre,
                apellido: response.data.cliente.apellido,
                dni: response.data.cliente.dni,
                cuit: response.data.cliente.cuit,
                email: response.data.cliente.email,
                domicilio_ciudad: response.data.cliente.domicilio_ciudad,
                domicilio_calle: response.data.cliente.domicilio_calle,
                domicilio_numero: response.data.cliente.domicilio_numero,
                domicilio_barrio: response.data.cliente.domicilio_barrio,
                domicilio_piso: response.data.cliente.domicilio_piso,
                domicilio_apartamento: response.data.cliente.domicilio_apartamento,
                fecha_nacimiento: response.data.cliente.fecha_nacimiento,
                pregunta1: response.data.cliente.pregunta1,
                pregunta1_respuesta: response.data.cliente.pregunta1_respuesta,
                pregunta2: response.data.cliente.pregunta2,
                pregunta2_respuesta: response.data.cliente.pregunta2_respuesta,
                pregunta3: response.data.cliente.pregunta3,
                pregunta3_respuesta: response.data.cliente.pregunta3_respuesta,
                cuentas:{
                    c1:response.data.cliente.cuentas[0],
                    c2:response.data.cliente.cuentas[1],
                }
                });
        }
        console.log(clienteBuscado)
            setDisplay(false);            
    };
    const handleBuscarclienteBuscadoCbu= (cbu) => {
        axios.get('https://integracion-banco.herokuapp.com/clientes/cbu?numero='+cbu+'',{
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
          }
        })
        .then(function (response) {
          //console.log(response)
          manageClienteBuscado(response);
          setClient(true);
        })
        .catch(function (error) {
          console.log(error);
          setDisplay(true);
          setClient(false);
        });
      };
    const handleBuscarclienteBuscadoCuit= (cuit) => {
        axios.get('https://integracion-banco.herokuapp.com/clientes/cuit?numero='+cuit+'',{
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
          }
        })
        .then(function (response) {
          //console.log(response)
          manageClienteBuscado(response);
          setClient(true);
        })
        .catch(function (error) {
          console.log(error);
          setDisplay(true);
          setClient(false);
        });
      };
      const buscarFactura = (codigo) => {
        setCodigoPago(codigo)
        axios.get('https://integracion-banco.herokuapp.com/facturas/'+codigo+'', {
        headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
          }
        }).then(function (response) {
            console.log(response.data.facturas)
            let temp=[];
                for (let i = 0; i < response.data.facturas.length; ++i) {
                    var tempi=[]
                    tempi.push(response.data.facturas[i].fecha_pagado, response.data.facturas[i].fecha_vencimiento, response.data.facturas[i].importe, response.data.facturas[i].numero_factura);
                    temp.push(tempi);
                }
            setFacturas(temp)
            console.log(facturas)
            setDisplayVerificar(false)
        })
        .catch(function (error) {
            console.log(error);
            setDisplayVerificar(true)
     });
    }
    const handleBuscarCliente = (dni) => {
        axios.get('https://integracion-banco.herokuapp.com/clientes/dni?numero='+dni+'',{
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
          }
        })
        .then(function (response) {
          //console.log(response)
          manageClienteBuscado(response);
          setClient(true);
        })
        .catch(function (error) {
          setClient(false);
          setDisplay(true);
        });
      };
    const[displayCajaahorro,setDisplayCajaahorro]=useState(true);
        return (
            <div className="Modificar">
                <Navigation />
            <div className={classes.modify}>
                <div><h2 className={classes.title}>Pago de servicios/impuestos</h2>
                    <Card className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <div className={classes.modify}>
                        <h7 className={classes.title1}>Buscar cliente por DNI/CBU/CUIT </h7>
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
                            setClient(false);
                            if((fields.Buscador).length>6 && (fields.Buscador).length<9){
                                handleBuscarCliente(fields.Buscador)
                                console.log("dni")
                            }else if((fields.Buscador).length===11){
                                handleBuscarclienteBuscadoCuit(fields.Buscador)
                                console.log("CUIT")
                            }else if((fields.Buscador).length===22){
                                handleBuscarclienteBuscadoCbu(fields.Buscador)
                                console.log("CBU")
                            }else{
                            setDisplay(true);
                            setClient(false);
                            }
                        }}
                        render={({ errors, status, touched }) => (
                            <Form>
                                <div class="row">
                                <Field name="Buscador" type="text"  className={'form-control col-sm-5 col-lg-9 ml-3' + (errors.Buscador && touched.Buscador ? ' is-invalid' : '')} />
                                <button type="submit" className="btn btn-primary col-sm-1 col-lg-1 ml-lg-2" style={{backgroundColor: "#BF6D3A"}}><SearchIcon /></button>
                                <ErrorMessage name="Buscador" component="div" className="invalid-feedback" />
                                {display && (
                                    <Alert severity="error">No se han encontrado resultados</Alert>)}
                                </div>
                            </Form>
                         )}
                        />
                        {client && (
                        <div className={classes.title1}>
                            <h7 >Nombre: </h7>{clienteBuscado.nombre}<br />
                            <h7>Apellido: </h7> {clienteBuscado.apellido} <br />
                            <h7 >DNI: </h7>{clienteBuscado.dni}<br />
                            <h7>CUIT: </h7>{clienteBuscado.cuit}<br />
                            <form>
                                <h7>Seleccione una cuenta: </h7>
                                <select
                                    onChange={(event) => changeAccount(event.target.value)}
                                    value={currentAccount}
                                >
                                    <option value="">Seleccione una cuenta</option>
                                    <option value={clienteBuscado.cuentas.c1.numero_cuenta}>{clienteBuscado.cuentas.c1.numero_cuenta}</option>
                                    {displayCajaahorro && (<option value={clienteBuscado.cuentas.c2.numero_cuenta}>{clienteBuscado.cuentas.c2.numero_cuenta}</option>)}
                                </select>
                            </form>
                                {displayAccount && (
                                        <Alert severity="warning">Debe seleccionar una cuenta</Alert>)}
                            <Formik 
                        initialValues={{
                            codigo: '',
                        }}
                        validationSchema={Yup.object().shape({
                            codigo: Yup.string()
                                .required('El campo es obligatorio (*)')
                        })}
                        onSubmit={fields => {
                            buscarFactura(fields.codigo)
                        }}
                        render={({ errors, status, touched }) => (
                            <Form>
                                <div class="row">
                                <h7 className={classes.title2}>Código de pago electrónico</h7>
                                <Field name="codigo" type="text"  className={'form-control col-sm-5 col-lg-9 ml-3' + (errors.codigo && touched.codigo ? ' is-invalid' : '')} />
                                <button type="submit" className="btn btn-primary col-sm-6 col-md-5 col-lg-2 ml-lg-2 mb-2" style={{backgroundColor: "#BF6D3A"}}>Validar</button>
                                <ErrorMessage name="codigo" component="div" className="invalid-feedback" />
                                {displayVerificar && (
                                        <Alert severity="warning">Debe validar el código de pago electrónico.</Alert>)}
                                </div>
                            </Form>
                         )}
                        />

                                <Button onClick={onClick} style ={{backgroundColor:"#BF6D3A", color:"white", marginTop:"5px"}} >  Siguiente  </Button>
                         </div>
                        )}
                        </div>
                    </Card>
                </div>
            </div>
            </div>
        );
}
export default BuscarPagoServicios;