import React, {useState}from 'react';
import './Navbar.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import AccountCircle from "@material-ui/icons/AccountCircle";
import history from './../../history';
import Modal from 'react-bootstrap/Modal';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';

import Logo from "./../../LogIn/Assets/Logo.png";
const Navigation = (props) => {
  const[user, setUser]=useState(props.location.state);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      marginLeft:"2%",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(2),
      width: 200,
    },
    modify: {
        padding:30,
    },
    modify1: {
        padding:10,
    },
    title:{
        fontStyle:"italic", 
        marginTop:"10px"
    },
    title1:{
        fontWeight: 'bold',
        textAlign:"center",
        marginTop:"5px"
    },
    card:{
      padding:"4%",
      height:"12rem",
    }
  })); 
  const classes = useStyles();
  const onClick= () =>{
    localStorage.clear();
    var userrr = JSON.parse(localStorage.getItem('user'));
    history.push("/")
}
    return (
        <Navbar style={{backgroundColor:"#ffbd59"}}>
            <Navbar.Brand ><img src={Logo} width="60" height="55" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link></Nav.Link>
                </Nav>
                <Nav className="cerrarsesion" style={{textAlign:"right"}}>
    <Nav.Link style={{color:"#825539"}} >{user.nombre} {user.apellido} <AccountCircle /></Nav.Link>
                    <Nav.Link style={{color:"#BF6D3A"}}  onClick={onClick}>Cerrar Sesión</Nav.Link>
                </Nav>
  </Navbar.Collapse>
        </Navbar>
        
    )
}

export default withRouter(Navigation);