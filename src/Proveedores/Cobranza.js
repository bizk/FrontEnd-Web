import React, { Component } from 'react';
import axios from 'axios';
import Navigation from './components/Navbar';
import { Card} from 'react-bootstrap';
import { Alert } from '@material-ui/lab';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BASE_URL = 'http://localhost:3000/';

class Cobranza extends Component {
	constructor(props) {
	super(props);
	  this.state = {
		selectedFile: null,
		display:false,
		display1:false,
		cliente:{ nombre: "Ignacio",
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
		},
		displayAhorro:false,
		displayCorriente:false,
		displayCargar:false,
	  }   
	};
	change = () =>{
		if (this.state.cliente.cuentas.cajaahorro ===""){
			this.setState({
				displayAhorro:false
			});
		}else{
			this.setState({
				displayAhorro:true
			});
		}
		if(this.state.cliente.cuentas.cuentacorriente ===""){
			this.setState({
				displayCorriente:false
			});
		}else{
			this.setState({
				displayCorriente:true
			});
		}
	}
	changeHandler = event=>{
    var uploadFile = event.target.files[0];    
        this.setState({
		    selectedFile: uploadFile
		});
	}
	fileUpload = () => {
	const formData = new FormData();    
	formData.append('file', this.state.selectedFile)    
	axios.post(BASE_URL, formData)
	  .then(res => {
		this.setState({
		    display1:true
		});
	  })
	  .catch(err => {
		this.setState({
		    display:true
		});
	  });

	};
	
	render() {
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
                <h6>El archivo que deberá cargar debe ser de formato .csv, el cual debe contener la siguiente información:<br />
				*código de pago electrónico<br />
				*número de factura<br />
				*importe<br />
				*fecha de vencimiento
				</h6><br />
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
				this.setState({
					displayCargar:true
				});
                console.log(fields.cuenta)
            }}
            render={({ errors, status, touched }) => (
                <Form>
                <div className="form-group">
                    <label htmlFor="tipo">Seleccione una cuenta</label>
                    <Field as="select"
						name="cuenta"
						onClick={this.change}
                        className={'form-control' + (errors.cuenta && touched.cuenta? ' is-invalid' : '')}
                    >
                        <option value="" label="Seleccione una cuenta" />
                        {this.state.displayAhorro &&(<option value="ahorro" label={this.state.cliente.cuentas.cajaahorro} />)}
                        {this.state.displayCorriente && (<option value="corriente" label={this.state.cliente.cuentas.cuentacorriente} />)}
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
					{this.state.displayCargar &&(<form method="post" action="#" id="#">
							<div className="form-group files">
								<h2>Cargue su archivo </h2>
								{this.state.display && (
                            	<Alert severity="error">Ha ocurrido un error al cargar el archivo</Alert>)}	
								{this.state.display1 && (
                            	<Alert severity="success">El archivo ha sido cargado exitosamente</Alert>)}							
								<input type="file" name="file" className="form-control" onChange={this.changeHandler}/>
							</div>
							<div className="col-md-6 pull-right">
								<button width="100%" type="button" className="btn btn-info" style={{backgroundColor:"#BF6D3A", marginBottom:"30px"}} onClick={this.fileUpload}>Cargar archivo</button>
							</div>
						</form>)}
					</div>
				</div>
			</div>
		</div>
	  );
	}
}
export default Cobranza;