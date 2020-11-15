import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from '../history';
import Cobranzas from "./Cobranza";
import Home from "./Home/Home";
import ResumenCuenta from "./ResumenCuenta";
export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/Home" component={Home}/>
                    <Route path="/Cobranzas"component={Cobranzas} />
                    <Route path="/ResumenCuenta" component={ResumenCuenta} />
                </Switch>
            </Router>
        )
    }
}
