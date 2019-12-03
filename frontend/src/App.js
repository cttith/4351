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
  const [email, setEmail] = useLocalStorage("email", "")
  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn", false);
  const [adminAuth, setAdminAuth] = useLocalStorage("adminAuth", false);

  // const [email, setEmail] = useState("");
  // const [loggedIn, setLoggedIn] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  // const [adminAuth, setAdminAuth] = useState(false);

  /* https://usehooks.com/useLocalStorage/ */
  function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = value => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };

    return [storedValue, setValue];
  }

  const handleEmail = event => {
    setEmail(event.target.value);
  };

  const handleLogin = e => {
    setLoggingIn(true)
    navigate('/login')
  }

  const ShowIntroPage = e => {
    if (!loggingIn && !adminAuth && !loggedIn) {
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

  const logOut = e => {
    setLoggedIn(false)
    setAdminAuth(false)
    setLoggingIn(false)
    navigate("/")
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="navbar-brand-custom">Admin Portal</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {loggedIn || adminAuth ? "Signed in as: " + email : ""}
          </Navbar.Text>
          <Button className="navbar-btn" hidden={!loggedIn && !adminAuth} type="submit" onClick={logOut}>  Sign Out</Button>
        </Navbar.Collapse>
      </Navbar>
      <ShowIntroPage />
      <Button variant="primary" onClick={handleLogin} hidden={loggingIn || adminAuth || loggedIn} className="login-margins">
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
