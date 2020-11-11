import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from '../history';
import Cobranzas from "./Cobranza";
export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/Home" component={Cobranzas}/>
                </Switch>
            </Router>
        )
    }
}
