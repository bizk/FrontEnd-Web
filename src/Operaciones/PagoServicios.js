import React, { Component } from 'react';
import Navigation from '../components/Navbar';
class PagoServicios extends Component {
    render() {
        return (
            <div className="PagoServicios">
                <Navigation />
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <div><h2>Pago de servicios/Impuestos</h2></div>
            </div>
            </div>
        );
    }
}

export default PagoServicios;