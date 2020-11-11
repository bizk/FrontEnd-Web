import React,{useState} from 'react';
import './App.css';
import Rutas from './Rutas';
import RouteBoth from "./RouteBoth";
function App() {
 
  return (
    <div className="App">
    <RouteBoth />
 {/* Acá tengo que buscar la forma de setear ese usuario con la info del local storage*/}
    </div>
  );
}

export default App;
