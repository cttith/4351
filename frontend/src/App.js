import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap'
import Login from './Containers/Login'

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="navbar-brand-custom">Admin Portal</Navbar.Brand>
      </Navbar>
      <Login />
    </div>
  );
}

export default App;
