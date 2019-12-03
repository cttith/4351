import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Button } from 'react-bootstrap'
import { Router, navigate } from "@reach/router"
import Login from './Containers/Login'
import Home from './Containers/Home'
import AdminPage from './Containers/AdminPage'
import ManageUsers from './Containers/ManageUsers'
import AssignRoles from './Containers/AssignRoles'


function App() {
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);


  const handleEmail = event => {
    setEmail(event.target.value);
  };

  const handleLogin = e => {
    setLoggingIn(true)
    navigate('/login')
  }

  const ShowIntroPage = e => {
    if (!loggingIn) {
      return (
        <div>
          <strong className="title"> Welcome to the Admin Portal!</strong>
          <p className="center-content body-margins"> Here to direct you to the correct application</p>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="navbar-brand-custom">Admin Portal</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {loggedIn || adminAuth ? "Signed in as: " + email : ""}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <ShowIntroPage />
      <Button variant="primary" onClick={handleLogin} hidden={loggingIn} className="login-margins">
        Login
            </Button>
      <Router>
        <Login email={email} handleEmail={handleEmail} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setAdminAuth={setAdminAuth} adminAuth={adminAuth} path="/login" />
        <Home path="/home" isAuth={loggedIn} email={email} />
        <AdminPage path="/admin" isAdmin={adminAuth} email={email} />
        <ManageUsers path="/admin/manageUsers" />
        <AssignRoles path="/admin/assignRoles" />
      </Router>
    </div>
  );
}

export default App;
