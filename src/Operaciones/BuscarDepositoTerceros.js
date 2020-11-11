import React, {useState } from 'react';
import { Button, Card} from 'react-bootstrap';
import Navigation from '../components/Navbar';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import { Alert } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import history from '../history';
function BuscarDepositoTerceros (props){
    const [cliente, setCliente]=useState();
    const [user, setUser]=useState(props.location.state);  
    const [currentAccount, setCurrentAccount] = useState();
    const [selectAccount, setSelectedAccount] = useState("");
    const onClick=()=>{
        console.log(selectAccount)
        if(selectAccount!==""){
            setDisplayAccount(false);
            history.push({
            pathname: '/DepositoTerceros',
            state:cliente})
            setDisplayAccount(true);
        }else{
            setDisplayAccount(true);
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
        }
      }));
    const Number = /^[0-9]+$/;
    const classes = useStyles();
    const [display, setDisplay]=useState(false);
    const[displayAccount, setDisplayAccount]=useState(false);
    const[displayCorriente,setDisplayCorriente]=useState(true);
    const[displayCajaahorro,setDisplayCajaahorro]=useState(true);
        return (
            <div className="Modificar">
                <Navigation />
            <div className={classes.modify}>
                <div><h2 className={classes.title}>Depósito terceros</h2>
                    <Card className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <div className={classes.modify}>
                        <h7 className={classes.title1}>Buscar cliente por CBU </h7>
                        <Formik 
                        initialValues={{
                            Buscador: '',
                        }}
                        validationSchema={Yup.object().shape({
                            Buscador: Yup.string()
                                .matches(Number,'Ingrese únicamente números')
                                .required('El campo es obligatorio (*)')
                                .min(22, 'El CBU ingresado no es correcto')
                                .max(22, 'El CBU ingresado no es correcto'),
                        })}
                        onSubmit={fields => {
                            const cliente={
                                nombre: "Ignacio",
                                apellido: "Matrix",
                                dni: "39753698",
                                cbu: "5467895236521045789630",
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
                                if(fields.Buscador !== cliente.cbu){
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
                            <h7>CBU: </h7>{cliente.cbu} <br />
                            <h7>Cuenta: </h7> {cliente.cuentas.cajaahorro}<br />
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
export default BuscarDepositoTerceros;