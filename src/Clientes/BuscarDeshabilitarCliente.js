import React, {useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Navigation from '../components/Navbar';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import history from './../history';
import { Alert } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

function BuscarDeshabilitarCliente (){
    const [cliente, setCliente]=useState();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
      const handleClosed = () => {
        setOpen(false);
        manageclienteEliminar();
        history.push({
            pathname: '/Home',
            state:JSON.parse(localStorage.getItem('user')) })        
    };
    const manageclienteEliminar = () =>{
      console.log(cliente)
        axios.delete(`https://integracion-banco.herokuapp.com/clientes/${clienteBuscado.id}`, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
              }
            })
            .then(function (response) {
              console.log(response)
            })
            .catch(function (error) {
              console.log(error);
            });
          };
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
        const classes = useStyles();
        const Number = /^[0-9]+$/;
        const [display, setDisplay]=useState(false);
        const [clienteBuscado,setclienteBuscado]=useState({})
        const manageClienteBuscado = (response) =>{
            console.log(response)
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
                });
                console.log(clienteBuscado)
                setDisplay(false);
                setCliente(true);
        };
        const handleBuscarclienteBuscadoCbu= (cbu) => {
          axios.get('https://integracion-banco.herokuapp.com/clientes/cbu?numero='+cbu+'',{
              headers: {
                  Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
            }
          })
          .then(function (response) {
              setDisplay(false);
              manageClienteBuscado(response);
          })
          .catch(function (error) {
            console.log(error);
            setDisplay(true);
          });
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
              setDisplay(false);
              manageClienteBuscado(response);
            })
            .catch(function (error) {
              console.log(error);
              setDisplay(true);
              setCliente(false);
            });
          };
        const handleBuscarclienteBuscado = (dni) => {
          axios.get('https://integracion-banco.herokuapp.com/clientes/dni?numero='+dni+'',
              {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
              }
            })
            .then(function (response) {
              //console.log(response)
              setDisplay(false);
              manageClienteBuscado(response);
            })
            .catch(function (error) {
              console.log(error);
              setDisplay(true);
              setCliente(false);
            });
          };
        return (
            <div className="Modificar">
                <Navigation />
            <div className={classes.modify}>
                <div><h2 className={classes.title}>Deshabilitar cliente</h2>
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
                            if((fields.Buscador).length>6 && (fields.Buscador).length<9){
                                handleBuscarclienteBuscado(fields.Buscador)
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
                                <Field name="Buscador" type="text" className={'form-control col-sm-5 col-lg-9 ml-3' + (errors.Buscador && touched.Buscador ? ' is-invalid' : '')} />
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
                            <h7>Nombre: </h7>{clienteBuscado.nombre}<br />
                            <h7>Apellido: </h7> {clienteBuscado.apellido} <br />
                            <h7>DNI: </h7>{clienteBuscado.dni}<br />
                            <h7>CUIT: </h7>{clienteBuscado.cuit}<br />
                            <Button onClick={handleClickOpen} style={{backgroundColor:"#BF6D3A",color:"white",marginTop:"15px"}}> Deshabilitar cliente</Button>
                         </div>
                        )}
                         <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">{"¿Está seguro que desea deshabilitar el cliente?"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Al momento de deshabilitar un cliente también se deshabilitarán las cuentas asociadas al mismo.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose} style={{backgroundColor:"#BF6D3A",color:"white",marginTop:"15px"}}>
                            Cancelar
                        </Button>
                        <Button onClick={handleClosed} style={{backgroundColor:"#BF6D3A",color:"white",marginTop:"15px"}} autoFocus>
                            Deshabilitar
                        </Button>
                        </DialogActions>
                    </Dialog>
                    </div>
                    </Card>
                </div>
            </div>
            </div>
        );
}
export default BuscarDeshabilitarCliente;