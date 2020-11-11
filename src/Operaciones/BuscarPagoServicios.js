import React, {useState } from 'react';
import { Button, Card} from 'react-bootstrap';
import Navigation from '../components/Navbar';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import { Alert } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import history from '../history';
function BuscarPagoServicios(props){
    const [cliente, setCliente]=useState();
    const [user, setUser]=useState(props.location.state);  
    const [clientee,setClientee]=useState("");
    const [currentAccount, setCurrentAccount] = useState();
    const [selectAccount, setSelectedAccount] = useState("");
    const onClick=()=>{
        console.log(selectAccount)
        if(clientee!==""){
            setDisplayVerificar(false)
        if(selectAccount!==""){
            setDisplayAccount(false);
            history.push({
            pathname: '/PagoServicios',
            state:clientee})
            setDisplayAccount(true);
        }else{
            setDisplayAccount(true);
        }}else{
            setDisplayVerificar(true)
        }
    }
    const changeAccount = (newAccount) => {
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
        return (
            <div className="Modificar">
                <Navigation />
            <div className={classes.modify}>
                <div><h2 className={classes.title}>Pago de servicios/impuestos</h2>
                    <Card className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <div className={classes.modify}>
                        <h7 className={classes.title1}>Buscar cliente por DNI </h7>
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
                                if(fields.Buscador !== cliente.dni){
                                    setDisplay(true);
                                    console.log(fields.buscar)
                                }else{
                                    setDisplay(false);
                                    if(cliente.cuentas.cuentacorriente==""){
                                        cliente.cuentas.cuentacorriente="-"
                                        setDisplayCorriente(false)
                                    }
                                    if(cliente.cuentas.cajaahorro==""){
                                        cliente.cuentas.cajaahorro="-"
                                        setDisplayCajaahorro(false)
                                    }
                                    console.log(cliente);
                                    setCliente(cliente);
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
                        {cliente && (
                        <div className={classes.title1}>
                            <h7 >Nombre: </h7>{cliente.nombre}<br />
                            <h7>Apellido: </h7> {cliente.apellido} <br />
                            <h7 >DNI: </h7>{cliente.dni}<br />
                            <h7>CUIT: </h7>{cliente.cuit}<br />
                            <h7>Cuenta/s: </h7><br />
                            <h7>Caja de ahorro: </h7>{cliente.cuentas.cajaahorro}<br /><h7>Cuenta corriente: </h7>{cliente.cuentas.cuentacorriente}<br />
                            <form>
                                <h7>Seleccione una cuenta: </h7>
                                <select
                                    onChange={(event) => changeAccount(event.target.value)}
                                    value={currentAccount}
                                >
                                    <option value="">Seleccione una cuenta</option>
                                    {displayCajaahorro && (<option value="ahorro">{cliente.cuentas.cajaahorro}</option>)}
                                    {displayCorriente && (<option value="corriente">{cliente.cuentas.cuentacorriente}</option>)}
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
                                .min(14, 'El código de pago ingresado no es correcto')
                                .max(14, 'El código de pago ingresado no es correcto'),
                        })}
                        onSubmit={fields => {
                            const clientee={
                                nombre: (cliente.nombre),
                                apellido: (cliente.apellido),
                                dni: (cliente.dni),
                                cuit: (cliente.cuit),
                                email:(cliente.email),
                                domicilio:(cliente.domicilio),
                                piso:(cliente.piso),
                                fechanac:(cliente.fechanac),
                                preg1: (cliente.preg1),
                                resp1: (cliente.resp1),
                                preg2: (cliente.preg2),
                                resp2: (cliente.res2),
                                preg3: (cliente.preg3),
                                resp3: (cliente.resp3),
                                cuentas: {
                                    cajaahorro:(cliente.cuentas.cajaahorro),
                                    cuentacorriente: (cliente.cuentas.cuentacorriente),
                                },
                                codigo:"12345678901234",
                                };
                            if(cliente.cuentas.cuentacorriente==""){
                                cliente.cuentas.cuentacorriente=" -"
                            }
                            if(cliente.cuentas.cajaahorro==""){
                                cliente.cuentas.cajaahorro="-"
                            }
                            console.log(clientee);
                            setClientee(clientee);
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