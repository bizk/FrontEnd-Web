import React, { Component } from 'react';
import Navigation from '../components/Navbar';
class Extraccion extends Component {
    render() {
        return (
            <div className="Extraccion">
                <Navigation />
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <div><h2>Extraccion de dinero</h2></div>
            </div>
            </div>
        );
    }
}

export default Extraccion;