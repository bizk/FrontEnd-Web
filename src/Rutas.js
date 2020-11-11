import React,{useState} from 'react';
import './App.css';
import RouteBoth from "./RouteBoth";
import Routes from "./Routes";
import RoutesProveedor from "./Proveedores/Routes";
function Rutas() {
    var userr =JSON.parse(localStorage.getItem('user'));
    console.log(userr);
  return (
    <div className="App">
    {(userr.usuario =="ignals")?
    <Routes />: <RoutesProveedor />
    }

 {/* Acá tengo que buscar la forma de setear ese usuario con la info del local storage*/}
    </div>
  );
}

export default Rutas;
