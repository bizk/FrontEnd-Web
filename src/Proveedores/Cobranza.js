import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './components/Navbar';
import { Card} from 'react-bootstrap';
import { Alert } from '@material-ui/lab';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BASE_URL = 'https://integracion-banco.herokuapp.com/';

function Cobranza () {
	const [display, setDisplay] = useState(false)
	const [display1,setDisplay1] = useState(false)
	const [displayCargar, setDisplayCargar]=useState(false)	
	const [selectedFile,setSelectedFile]=useState({})
	const [cuenta,setCuentas] = useState([])
	const url = 'https://integracion-banco.herokuapp.com/cuentas';
	const urlfacturas = 'https://integracion-banco.herokuapp.com/facturas/cargar';
	useEffect(() => {
		const fetchData = async () => {
		const result = await axios.get(url, {
		  headers: {
			  Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) //the token is a variable which holds the token
		}
	  })
		  setCuentas(result.data.cuentas)
		} 
	  fetchData()
},[]);

	const change = () =>{

	}
	const [index,setIndex]=useState('')
	const changeHandler = event =>{
		var uploadFile = event.target.files[0];    
        setSelectedFile(uploadFile);
	}
	const fileUpload = () => {
	const form = new FormData();
	form.append('archivo', new Blob([selectedFile], { type: 'text/csv' }));
	form.append('numero_cuenta', cuenta[index].numero_cuenta)
	axios.post(urlfacturas, form,
		{
			headers: {
				Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')), //the token is a variable which holds the token
				'Access-control-Allow-Origin': true,
		},
	})
	  .then(res => {
		console.log("factura cargada")
		setDisplay1(true)
	  })
	  .catch(err => {
		console.log("no se cargaron las facturas")
		setDisplay(true)
	  }); 
	
	};
	
	  return (
        <div>
            <Navigation />
            <div><h2 className="offset-md-4 mt-5 mb-5" style={{fontStyle:"italic"}}>Cobranza de servicios/impuestos</h2></div>
			<Card className="col-sm-6 col-md-4 offset-md-4 col-lg-4 offset-lg-4 ml-6">
            <div style={{padding:30}}>
            <div style={{ fontWeight: 'bold',
        	textAlign:"left",
        	marginTop:"5px"}}>
                <h5>Instrucciones sobre la carga de archivo: </h5>
                <h6>El archivo que deberá cargar debe ser de formato .txt, el cual debe contener la siguiente información:<br />
				*código de pago electrónico<br />
				*número de factura<br />
				*importe<br />
				*fecha de vencimiento
				</h6>
				<h6>Ejemplo:</h6>
				<img src={require('./ejemplo.PNG')} class="img-fluid mb-2" alt="Responsive image"/>
				<div class="container">
            <div class="row">
                <Formik
            initialValues={{
                cuenta: '',
            }}
            validationSchema={Yup.object().shape({
                cuenta: Yup.string()
                    .required('El campo es obligatorio (*)'),
            })}
            onSubmit={fields => {
				setDisplayCargar(true)
				console.log(fields.cuenta)
				setIndex(fields.cuenta)
            }}
            render={({ errors, status, touched }) => (
                <Form>
                <div className="form-group">
                    <label htmlFor="tipo">Seleccione una cuenta</label>
                    <Field as="select"
						name="cuenta"
						onClick={() => change()}
                        className={'form-control' + (errors.cuenta && touched.cuenta? ' is-invalid' : '')}
                    >
						<option value="" label="Seleccione una cuenta" />
                        {cuenta.map((cuentas,i) => <option key={i} value={i} label={cuentas.numero_cuenta} />)}
                    </Field>
                    <ErrorMessage name="cuenta" component="div" className="invalid-feedback" />
                </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-2" style={{backgroundColor: "#BF6D3A", marginTop:"15px"}}>Comenzar a cargar</button>
                    </div>
                </Form>
            )}
        />
            </div>
			</div>
			</div>
			</div>
            </Card>
			<div className="container">
				<div className="row">
					<div className="col-md-5 offset-md-3 mt-4">					
					{displayCargar &&(<form method="post" action="#" id="#">
							<div className="form-group files">
								<h2>Cargue su archivo </h2>
								{display && (
                            	<Alert severity="error">Ha ocurrido un error al cargar el archivo</Alert>)}	
								{display1 && (
                            	<Alert severity="success">El archivo ha sido cargado exitosamente</Alert>)}							
								<input type="file" name="file" className="form-control" onChange={(e) => changeHandler(e)}/>
							</div>
							<div className="col-md-6 pull-right">
								<button width="100%" type="button" className="btn btn-info" style={{backgroundColor:"#BF6D3A", marginBottom:"30px"}} onClick={() => fileUpload()}>Cargar archivo</button>
							</div>
						</form>)}
					</div>
				</div>
			</div>
		</div>
	  );
	}
export default Cobranza;