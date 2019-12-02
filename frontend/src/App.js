import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap'
import { Router } from "@reach/router"
import Login from './Containers/Login'
import Home from './Containers/Home'

function App() {
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleEmail = event => {
    setEmail(event.target.value);
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="navbar-brand-custom">Admin Portal</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: {loggedIn ? email : ""}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Router>
        <Login email={email} handleEmail={handleEmail} loggedIn={loggedIn} setLoggedIn={setLoggedIn} path="/" />
        <Home path="/home" />
      </Router>
    </div>
  );
}

export default App;
