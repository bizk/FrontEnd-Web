import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import LogIn from "./LogIn/LogIn";
import history from './history';
import Rutas from './Rutas';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={LogIn}/>
                    <Rutas />
                </Switch>
            </Router>
        )
    }
}
