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
import BuscarExtraccionDinero from "./Operaciones/BuscarExtraccionDinero";
import ExtraccionDinero from "./Operaciones/ExtraccionDinero";
import BuscarDeposito from "./Operaciones/BuscarDeposito";
import BuscarDepositoPropio from "./Operaciones/BuscarDepositoPropio";
import BuscarDepositoTerceros from "./Operaciones/BuscarDepositoTerceros";
import DepositoPropio from "./Operaciones/DepositoPropio";
import DepositoTerceros from "./Operaciones/DepositoTerceros";
import BuscarPagoServicios from "./Operaciones/BuscarPagoServicios";
import ModificarCliente from "./Clientes/ModificarCliente";
import BuscarCrearCuenta from "./Cuentas/BuscarCrearCuenta";
import PagoServicios from "./Operaciones/PagoServicios";
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
                    <Route path="/BuscarExtraccionDinero" component={BuscarExtraccionDinero} />
                    <Route path="/ExtraccionDinero" component={ExtraccionDinero} />
                    <Route path="/BuscarDepositoDinero" component={BuscarDeposito} />
                    <Route path="/BuscarDepositoPropio" component={BuscarDepositoPropio} />
                    <Route path="/BuscarDepositoTerceros" component={BuscarDepositoTerceros} />
                    <Route path="/DepositoPropio" component={DepositoPropio} />
                    <Route path="/DepositoTerceros" component={DepositoTerceros} />
                    <Route path="/BuscarPagoServicios" component={BuscarPagoServicios} />
                    <Route path="/PagoServicios" component={PagoServicios} />
                </Switch>
            </Router>
        )
    }
}
