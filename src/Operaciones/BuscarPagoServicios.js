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
    const [clientee,setClientee]=useState("");
    const [currentAccount, setCurrentAccount] = useState();
    const [selectAccount, setSelectedAccount] = useState("");
    const onClick=()=>{
        history.push({
            pathname: '/PagoServicios',
            cliente: clienteBuscado,
            facturasObtenidas: facturas,
            saldoCliente: saldo,
            numeroCuentaSeleccionada: numeroCuenta,
            codigoPago: codigoIngresado,
        })
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
    const[displayCorriente,setDisplayCorriente]=useState(true);
    const[displayCajaahorro,setDisplayCajaahorro]=useState(true);
    const [clienteBuscado,setClienteBuscado]=useState({})
    const [cuenta,setCuentas] = useState([])
    const [facturas, setFacturas] = useState([])
    const [movimientos, setMovimientos] = useState([]);
    const [saldo,setSaldo] = useState('')
    const [numeroCuenta, setNumeroCuenta] = useState('')
    const [codigoIngresado, setCodigoPago] = useState('')
    const manageCliente = (response) =>{
        console.log(response)
        if(response.data.cliente.cuentas[0]===undefined){
            setDisplay(true); 
        }else
        if(response.data.cliente.cuentas[1]===undefined){
            setDisplayCajaahorro(false);
            setClienteBuscado({
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
                setClienteBuscado({
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
            setDisplay(false);
            setCliente(true)    
    };

    const handleBuscarclienteBuscadoCuit= (cuit) => {
        axios.get('https://integracion-banco.herokuapp.com/clientes/cuit?numero='+cuit+'',
          {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
          }
        })
        .then(function (response) {
          //console.log(response)
          getCuentas(response.data.cliente.id)
          manageCliente(response);
          setDisplay(false);
        })
        .catch(function (error) {
          console.log(error);
          setDisplay(true);
          setCliente(false);
        });
      };
      const handleBuscarclienteBuscadoCbu= (cbu) => {
        axios.get('https://integracion-banco.herokuapp.com/clientes/cbu?numero='+cbu+'',{
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
          }
        })
        .then(function (response) {
            setDisplay(false);
            getCuentas(response.data.cliente.id)
            manageCliente(response);
        })
        .catch(function (error) {
          console.log(error);
          setDisplay(true);
        });
      };
    const handleBuscarCliente = (dni) => {
        axios.get('https://integracion-banco.herokuapp.com/clientes/dni?numero='+dni+'',
          {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
          }
        })
        .then(function (response) {
          //console.log(response)
          setDisplay(false);
          getCuentas(response.data.cliente.id)
          manageCliente(response);
        })
        .catch(function (error) {
          console.log(error);
          setDisplay(true);
        });
      };

      const getCuentas = (id) => {
        axios.get('https://integracion-banco.herokuapp.com/cuentas?cliente_id='+id+'', {
        headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
          }
        }).then(function (response) {
            setCuentas(response.data.cuentas)
        })
        .catch(function (error) {
            console.log(error);
     });
    }

    const handleResumen = (index) => {       
          axios.get('https://integracion-banco.herokuapp.com/cuentas/'+(cuenta[index].numero_cuenta)+'/resumen', {
              headers: {
                  Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
            }
          })
              .then(function (response) {
                  setSaldo(response.data.cuenta.saldo)
                  console.log(saldo)
                  setNumeroCuenta(cuenta[index].numero_cuenta)      
              })
              .catch(function (error) {
                console.log(error);
              });
      }


    const buscarFactura = (codigo) => {
        axios.get('https://integracion-banco.herokuapp.com/facturas/'+codigo+'', {
        headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
          }
        }).then(function (response) {
            console.log(response.data.facturas)
            let temp=[];
            setCodigoPago(codigo)
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
                                .min(7, 'El DNI ingresado no es correcto')
                                .max(8, 'El DNI ingresado no es correcto'),
                        })}
                        onSubmit={fields => {
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
                            setCliente(false);
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
                        {clienteBuscado && (
                        <div className={classes.title1}>
                            <h7 >Nombre: </h7>{clienteBuscado.nombre}<br />
                            <h7>Apellido: </h7> {clienteBuscado.apellido} <br />
                            <h7 >DNI: </h7>{clienteBuscado.dni}<br />
                            <h7>CUIT: </h7>{clienteBuscado.cuit}<br />
                            <h7>Cuenta/s: </h7><br />
                            <form>
                                <h7>Seleccione una cuenta: </h7>
                                <select
                                    onChange={(event) => handleResumen(event.target.value)}
                                    value={currentAccount}
                                >
                                    <option value="">Seleccione una cuenta</option>
                                {cuenta.map((cuentas,i) => <option key={i} value={i} label={cuentas.numero_cuenta} />)}
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
                                .matches(Number,'Ingrese únicamente números')
                                .required('El campo es obligatorio (*)')
                                .min(10, 'El código de pago ingresado no es correcto')
                                .max(15, 'El código de pago ingresado no es correcto'),
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