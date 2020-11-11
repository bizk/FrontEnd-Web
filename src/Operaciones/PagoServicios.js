import React, {useState, useEffect  } from 'react';
import Navigation from '../components/Navbar';
import {Card, Button} from 'react-bootstrap';
import history from './../history';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import Modal from 'react-bootstrap/Modal';
function PagoServicios (props){
    const [cliente, setCliente]=useState(props.location.state);
    const[pagar,setPagar]=useState(0);
    const [show, setShow] = useState(false);
        const handleClose = () =>{
            setShow(false);
            history.push({
                pathname: '/BuscarPagoServicios',
                state:JSON.parse(localStorage.getItem('user')) })
        }
        const handleShow = () => setShow(true);
    const [facturaState, setFacturaState] = useState([]);
    var miArray = new Array();
    const numRows = facturaState.length
    const numRowss=miArray.length
    const onClick= () =>{
        var sum=0;
        for (let i = 0; i < numRows; ++i) {
            if(facturaState[i].select == true){
                setPagar(parseInt(pagar)+facturaState[i].cantidad)
                sum=sum+facturaState[i].cantidad
                const facturas={
                    factura_id:(facturaState[i].factura_id),
                    estado: (facturaState[i].estado),
                    vencimiento: (facturaState[i].fechav),
                    cantidad: (facturaState[i].cantidad)
                }
                miArray[i]=(facturaState[i])
            }
        }
        console.log(miArray.length)
        if(sum>parseInt(saldo)){
            setDisplay(true)
        }else{
            setSaldo(parseInt(saldo)-sum)
            setDisplay(false)
            for (let i = 0; i < miArray.length; ++i) {
                facturaState[i].estado="Pagada"
            }
            setShow(true)
    }
}
    const [saldo, setSaldo]=useState(9800);
    const [display, setDisplay]=useState(false);

  useEffect(() => {
    let facturaState = [
      { id: 1, factura_id: "56666", estado: "Vencida", fechav: "09-11-2020", cantidad: 5000 },
      { id: 2, factura_id:"42222", estado: "Pagada", fechav: "08-10-2020", cantidad: 4800 },
      { id: 3,factura_id: "30000", estado: "Pagada", fechav: "06-09-2020", cantidad: 4500  }
    ];
    setFacturaState(
      facturaState.map(d => {
        return {
          select: false,
          id: d.id,
          factura_id: d.factura_id,
          estado: d.estado,
          fechav: d.fechav,
          cantidad: d.cantidad,
        };
      })
    );
  }, []);
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
        title1:{
            fontWeight: 'bold',
            textAlign:"left",
            marginTop:"5px"
        }, 
      }));
    const Number = /^[0-9]+$/;
    const classes = useStyles();
        return (
            <div className="Modificar">
                <Navigation />
            <div className={classes.modify}>
                <div><h2 className={classes.title}>Pago de servicios/impuestos</h2></div>
                <div class="container">
                <Card className="col-sm-6 col-md-4 offset-md-4 col-lg-4 offset-lg-4 ml-6">
                    <div className={classes.modify1}>
                    <div className={classes.title1}>
                        <h4>Cuenta: </h4><h5>{cliente.cuentas.cajaahorro}</h5>
                        <h4>Su Saldo: </h4><h5>$ {saldo}</h5>
                        <h4>Código de pago electrónico: </h4><h5>{cliente.codigo}</h5>
                    </div>
                    </div>
                    {display && (
                                    <Alert severity="error">No cuenta con el dinero suficiente</Alert>)}
                    <Button onClick={onClick} style ={{backgroundColor:"#BF6D3A", color:"white", marginTop:"15px"}}>Realizar pago</Button>
                </Card>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">
                        <input
                            type="checkbox"
                            onChange={e => {
                            let checked = e.target.checked;
                            setFacturaState(
                                facturaState.map(d => {
                                d.select = checked;
                                return d;
                                })
                            );
                            }}
                        ></input>
                        </th>
                        <th scope="col">Número de factura</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Fecha de vencimiento</th>
                        <th scope="col">Cantidad</th>
                    </tr>
                    </thead>
                    <tbody>
                    {facturaState.map((d, i) => (
                        <tr key={d.id}>
                        <th scope="row">
                            <input
                            onChange={event => {
                                let checked = event.target.checked;
                                setFacturaState(
                                facturaState.map(data => {
                                    if (d.id === data.id) {
                                    data.select = checked;
                                    }
                                    return data;
                                })
                                );
                            }}
                            type="checkbox"
                            checked={d.select}
                            ></input>
                        </th>
                        <td>{d.factura_id}</td>
                        <td>{d.estado}</td>
                        <td>{d.fechav}</td>
                        <td>$ {d.cantidad}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            <Modal size="lg" size="lg" style={{maxWidth: '1600px'}}show={show} onHide={handleClose} >
            <Modal.Header closeButton>
            <Modal.Title>Pago realizado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="success">El pago ha sido realizado exitosamente</Alert>
                <Alert severity="warning">Su nuevo saldo es de $ {saldo}</Alert>
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

export default PagoServicios;