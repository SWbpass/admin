import './App.css';
import logo from './logo.svg';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./pages/Login";
import Main from "./pages/Main";

function App() {

    return (
        <Router basename={process.env.PUBLIC_URL}>
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="#"> <img src={logo} alt={logo}/></a>
            </nav>
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route path='/login' component={Login}/>
            </Switch>
        </Router>
    );
}

export default App;
