import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import history from './history';
import LogIn from "./LogIn/LogIn";
import AñadirCliente from "./Clientes/AñadirCliente";
import BuscarModificarCliente from "./Clientes/BuscarModificarCliente";
import BuscarDeshabilitarCliente from "./Clientes/BuscarDeshabilitarCliente";
import CrearCuenta from "./Cuentas/CrearCuenta";
import BuscarResumenCuenta from "./Cuentas/BuscarResumenCuenta";
import Extraccion from "./Operaciones/Extraccion";
import Deposito from "./Operaciones/Deposito";
import PagoServicios from "./Operaciones/PagoServicios";
import ModificarCliente from "./Clientes/ModificarCliente";
import BuscarCrearCuenta from "./Cuentas/BuscarCrearCuenta";
import ResumenCuenta from "./Cuentas/ResumenCuenta";
export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={LogIn}/>
                    <Route path="/Home" component={Home}/>
                    <Route path="/DeshabilitarCliente" component={BuscarDeshabilitarCliente} />
                    <Route path="/ModificarCliente" component={BuscarModificarCliente} />
                    <Route path="/ModificarClienteBuscado" component={ModificarCliente} />
                    <Route path="/AñadirCliente" component={AñadirCliente} />
                    <Route path="/CrearCuenta" component={CrearCuenta} />
                    <Route path="/BuscarCrearCuenta" component={BuscarCrearCuenta} />
                    <Route path="/BuscarResumenCuenta" component={BuscarResumenCuenta} />
                    <Route path="/ResumenCuenta" component={ResumenCuenta} />
                    <Route path="/ExtraccionDinero" component={Extraccion} />
                    <Route path="/DepositoDinero" component={Deposito} />
                    <Route path="/PagoServicios" component={PagoServicios} />
                </Switch>
            </Router>
        )
    }
}
