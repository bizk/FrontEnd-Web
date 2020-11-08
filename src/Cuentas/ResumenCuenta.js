import React, { Component } from 'react';
import Navigation from '../components/Navbar';

class ResumenCuenta extends Component {
    render() {
        return (
            <div className="ResumenCuenta">
                <Navigation/>
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <div><h2>Resumen cuenta bancaria</h2>
                </div>
            </div>
            </div>
        );
    }
}

export default ResumenCuenta;