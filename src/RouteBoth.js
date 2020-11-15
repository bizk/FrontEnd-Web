import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import LogIn from "./LogIn/LogIn";
import history from './history';
import Rutas from './Rutas';
import PrimerPaso from "./OlvidarContraseña/components/PrimerPaso";
import SegundoPaso from "./OlvidarContraseña/components/SegundoPaso";
import Registrarse from "./Registrarse/Registrarse";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={LogIn}/>
                    <Route path="/OlvideContraseña" component={PrimerPaso} />
                    <Route path="/RecuperarContraseña" component={SegundoPaso} />
                    <Route path="/Registrarse" component={Registrarse} />
                    <Rutas />
                </Switch>
            </Router>
        )
    }
}
