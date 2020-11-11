import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Navigation from './components/Navbar';
const BASE_URL = 'http://localhost:3000/';

class Cobranza extends Component {
	constructor(props) {
	super(props);
	  this.state = {
		selectedFile: null
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
		toast.success('El archivo ha sido cargado exitosamente');
	  })
	  .catch(err => {
		toast.error('Ha ocurrido un error al cargar el archivo');
	  });

	};
	
	render() {
	  return (
        <div>
            <Navigation />
            <div><h2 className="offset-md-4 mt-5 mb-5"style={{fontStyle:"italic"}}>Cobranza de servicios/impuestos</h2></div>
			<div className="container">
				<div className="row">
					<div className="col-md-8 offset-md-2 mt-5">					
						<form method="post" action="#" id="#">
							<div className="form-group files">
								<h2>Cargue su archivo </h2>
								<ToastContainer />							
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