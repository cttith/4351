import React, { useState, useEffect } from 'react';
import './Login.css';
import { Form, Button, Alert } from 'react-bootstrap'
// import { Button } from 'react-bootstrap'
import { navigate } from "@reach/router"



// ES6 CLASS COMMENTED OUT
// class Login extends React.Component{

//     constructor(props) {
//         super(props);
//         this.state = {
//             email: "", 
//             password: ""
//         }
//     } 

//     authenticate(){

//     }

//     render(){
//         return (
//             <div >
//                 <Form className="form-margins">
//                     <Form.Group className="center-content" controlId="formBasicEmail">
//                         <Form.Label>Email address</Form.Label>
//                         <Form.Control type="email" placeholder="Enter email" onChange=  />
//                     </Form.Group>
//                     <Form.Group className="center-content password-margins" controlId="formBasicPassword">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control type="password" placeholder="Password" />
//                     </Form.Group>
//                     <Button variant="primary" type="submit" onSubmit= {this.authenticate}>
//                         Login
//                     </Button>
//                 </Form>

//             </div>

//         )
//     }
// }

function Login({ email, handleEmail, loggedIn, setLoggedIn }) {
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);


    useEffect(() => {
        if (loggedIn === true) {
            navigate('/home')
        } else {
            console.log("invalid credentials")
        }
    }, [loggedIn]);

    useEffect(() => {
        if (showLogin) {
            console.log("trueee")
        }
    })

    const handleLogin = e => {
        setShowLogin(true)
    }

    const handleSignUp = e => {
        setShowSignUp(true)
    }

    function authenticate() {
        let request = {
            email: email,
            password: password
        }
        let url = 'http://localhost:8080/authenticate'

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(result => {
            return result.json()
        }).then(result => {
            if (JSON.parse(result) === 200) {
                setLoggedIn(true)
                setShowAlert(false)
            } else {
                console.log("setting show to true")
                setLoggedIn(false)
                setShowAlert(true)
            }
        }).catch(e => {
            console.log("Error: " + e)
        })
    }

    function RevealAlert() {
        if (showAlert) {
            return (
                <Alert variant="danger" className="alert-margins">
                    <Alert.Heading>Invalid Credentials!</Alert.Heading>
                </Alert>
            )
        } else {
            return null
        }
    }

    function RevealLogin() {
        if (showLogin) {
            return (
                <Form className="form-margins">
                    <Form.Group className="center-content" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={
                                handleEmail
                            }
                        />
                    </Form.Group>
                    <Form.Group className="center-content password-margins" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={
                                e => {
                                    setPassword(e.target.value);
                                }
                            } />
                    </Form.Group>
                    <Button variant="primary" onClick={authenticate}>
                        Login
                </Button>
                    <RevealAlert />
                </Form>
            )
        } else {
            return null
        }
    }

    // function RevealSignUp() {
    //     if (showSignUp) {
    //         return (
    //             <Form>
    //                 <Form.Group as={Row} controlId="formHorizontalEmail">
    //                     <Form.Label column sm={2}>
    //                         Email
    // </Form.Label>
    //                     <Col sm={10}>
    //                         <Form.Control type="email" placeholder="Email" />
    //                     </Col>
    //                 </Form.Group>

    //                 <Form.Group as={Row} controlId="formHorizontalPassword">
    //                     <Form.Label column sm={2}>
    //                         Password
    // </Form.Label>
    //                     <Col sm={10}>
    //                         <Form.Control type="password" placeholder="Password" />
    //                     </Col>
    //                 </Form.Group>
    //             </Form>
    //         )
    //     } else {
    //         return null
    //     }
    // }

    return (
        <div >
            <Form className="form-margins">
                <Form.Group className="center-content" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={
                            handleEmail
                        }
                    />
                </Form.Group>
                <Form.Group className="center-content password-margins" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={
                            e => {
                                setPassword(e.target.value);
                            }
                        } />
                </Form.Group>
                <Button variant="primary" onClick={authenticate}>
                    Login
                </Button>
                <RevealAlert />
            </Form>
        </div>

    )
}


export default Login;