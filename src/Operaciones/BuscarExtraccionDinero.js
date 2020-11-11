import React, {useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import Navigation from '../components/Navbar';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import { Router, Switch, Route, Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import history from '../history';
function BuscarExtraccion (props){
    const [cliente, setCliente]=useState();
    const [user, setUser]=useState(props.location.state);  
    const [currentAccount, setCurrentAccount] = useState();
    const [selectAccount, setSelectedAccount] = useState();
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
        return (
            <div className="Modificar">
                <Navigation user={user} />
            <div className={classes.modify}>
                <div><h2 className={classes.title}>Extraccion de dinero</h2>
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
                            if(cliente.cuentas.cuentacorriente==""){
                                cliente.cuentas.cuentacorriente=" -"
                            }
                            if(cliente.cuentas.cajaahorro==""){
                                cliente.cuentas.cajaahorro="-"
                            }
                            console.log(cliente);
                            setCliente(cliente);
                        }}
                        render={({ errors, status, touched }) => (
                            <Form>
                                <div class="row">
                                <Field name="Buscador" type="text"  className={'form-control col-sm-5 col-lg-9 ml-3' + (errors.Buscador && touched.Buscador ? ' is-invalid' : '')} />
                                <button type="submit" className="btn btn-primary col-sm-1 col-lg-1 ml-lg-2" style={{backgroundColor: "#BF6D3A"}}><SearchIcon /></button>
                                <ErrorMessage name="Buscador" component="div" className="invalid-feedback" />
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
                            <h7>Cuenta/s: </h7><br /><h7>Caja de ahorro: </h7>
                            {cliente.cuentas.cajaahorro}<br /><h7>Cuenta corriente: </h7>{cliente.cuentas.cuentacorriente}<br />
                            <form>
                                <h7>Seleccione una cuenta: </h7>
                                <select
                                    onChange={(event) => changeAccount(event.target.value)}
                                    value={currentAccount}
                                >
                                    <option value="">Seleccione una cuenta</option>
                                    <option value="ahorro">{cliente.cuentas.cajaahorro}</option>
                                    <option value="corriente">{cliente.cuentas.cuentacorriente}</option>
                                </select>
                            </form>
                                <Link to={{
                                    pathname: '/ExtraccionDinero',
                                    state:cliente}}><Button style ={{backgroundColor:"#BF6D3A", color:"white"}} >  Siguiente  </Button></Link>
                         </div>
                        )}
                        </div>
                    </Card>
                </div>
            </div>
            </div>
        );
}
export default BuscarExtraccion;