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
function BuscarCrearCuenta (props){
    const [user, setUser]=useState(props.location.state);  
    const [currentAccount, setCurrentAccount] = useState();
    const [selectAccount, setSelectedAccount] = useState("");
    const onClick=()=>{
        console.log(selectAccount)
        if(selectAccount!==""){
            setDisplayAccount(false);
            history.push({
            pathname: '/ResumenCuenta',
            state:clienteBuscado})
        }else{
            setDisplayAccount(true);
        }
    }
    const changeAccount = (newAccount) => {
        console.log(clienteBuscado.cuentas)
        setSelectedAccount(newAccount)
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
        }
      }));
    const Number = /^[0-9]+$/;
    const classes = useStyles();
    const [display, setDisplay]=useState(false);
    const[displayAccount, setDisplayAccount]=useState(false);
    const[displayCorriente,setDisplayCorriente]=useState(true);
    const[displayCajaahorro,setDisplayCajaahorro]=useState(true);
    const[client,setClient]=useState(false);
    const [clienteBuscado,setclienteBuscado]=useState({});
    const [cuentasPicker, setCuentasPicker] = useState([]); //setear las cuentas del usuario mediante consulta de bd con el id del usuario como parametro
    const manageClienteBuscado = (response) =>{
        console.log(response)
        if(response.data.cliente.cuentas[0]===undefined){
            setDisplay(true); 
        }else
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
 
        return (
            <div className="Modificar">
                <Navigation />
            <div className={classes.modify}>
                <div><h2 className={classes.title}>Resumen cuenta bancaria</h2>
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
                                <Button onClick={onClick} style ={{backgroundColor:"#BF6D3A", color:"white"}} >  Siguiente  </Button>
                         </div>
                        )}
                        </div>
                    </Card>
                </div>
            </div>
            </div>
        );
}
export default BuscarCrearCuenta;