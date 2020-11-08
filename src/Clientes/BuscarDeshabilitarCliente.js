import React, {useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import Navigation from '../components/Navbar';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import { Router, Switch, Route,Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import history from '../history';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
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
        setCliente();
        
    };
    const styles=makeStyles((theme) => ({
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
        return (
            <div className="Modificar">
                <Navigation />
            <div style={{padding: 30 }}>
                <div><h2 style={{fontStyle:"italic", textAlign:"center"}}>Deshabilitar cliente</h2>
                    <Card style={{ width: '48rem', padding: 30, marginLeft:"340px", height:"auto" }}>
                        <h7 style={{fontWeight: 'bold'}}>Buscar cliente por DNI </h7>
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
                                };
                            console.log(cliente);
                            setCliente(cliente);
                        }}
                        render={({ errors, status, touched }) => (
                            <Form>
                                <Field name="Buscador" type="text" className={'form-control' + (errors.Buscador && touched.Buscador ? ' is-invalid' : '')} />
                                <ErrorMessage name="Buscador" component="div" className="invalid-feedback" />
                                <button type="submit" className="btn btn-primary mr-2" style={{backgroundColor: "#BF6D3A", marginTop:"5px"}}><SearchIcon /></button>
                            </Form>
                         )}
                        />
                        {cliente && (
                        <div className="nombre" style={{marginTop:"15px"}}>
                            <h7 style={{fontWeight: 'bold'}}>Nombre: </h7>{cliente.nombre}<br />
                            <h7 style={{fontWeight: 'bold'}}>Apellido: </h7> {cliente.apellido} <br />
                            <h7 style={{fontWeight: 'bold'}}>DNI: </h7>{cliente.dni}<br />
                            <h7 style={{fontWeight: 'bold'}}>CUIT: </h7>{cliente.cuit}<br />
                            <Button onClick={handleClickOpen} style ={{backgroundColor:"#BF6D3A", color:"white", marginTop:"15px"}} > Deshabilitar cliente</Button>
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
                        <Button onClick={handleClose} style ={{backgroundColor:"#BF6D3A", color:"white", marginTop:"15px"}}>
                            Cancelar
                        </Button>
                        <Button onClick={handleClosed} style ={{backgroundColor:"#BF6D3A", color:"white", marginTop:"15px"}} autoFocus>
                            Deshabilitar
                        </Button>
                        </DialogActions>
                    </Dialog>
                    </Card>
                </div>
            </div>
            </div>
        );
}
export default BuscarDeshabilitarCliente;