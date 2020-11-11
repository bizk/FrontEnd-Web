import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Navigation from './components/Navbar';
import { Button, Card} from 'react-bootstrap';
import { Alert } from '@material-ui/lab';

const BASE_URL = 'http://localhost:3000/';

class Cobranza extends Component {
	constructor(props) {
	super(props);
	  this.state = {
		selectedFile: null,
		display:false,
		display1:false,
	  }   
	};
  
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
                <h7>El archivo que deberá cargar debe ser de formato .csv, el cual debe contener la siguiente información:<br />
				*código de pago electrónico<br />
				*número de factura<br />
				*importe<br />
				*fecha de vencimiento
				</h7>
            </div>
            </div>
            </Card>
			<div className="container">
				<div className="row">
					<div className="col-md-5 offset-md-3 mt-4">					
						<form method="post" action="#" id="#">
							<div className="form-group files">
								<h2>Cargue su archivo </h2>
								{this.state.display && (
                            	<Alert severity="error">Ha ocurrido un error al cargar el archivo</Alert>)}	
								{this.state.display1 && (
                            	<Alert severity="success">El archivo ha sido cargado exitosamente</Alert>)}							
								<input type="file" name="file" className="form-control" onChange={this.changeHandler}/>
							</div>
							<div className="col-md-6 pull-right">
								<button width="100%" type="button" className="btn btn-info" style={{backgroundColor:"#BF6D3A"}} onClick={this.fileUpload}>Cargar archivo</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	  );
	}
}
export default Cobranza;