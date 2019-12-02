import React, { useState, useEffect } from 'react';
import './Login.css';
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

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

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (loggedIn === true) {
            console.log("need to re-route")
        } else {
            console.log("invalid credentials")
        }
    }, [loggedIn]);

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
            } else {
                setLoggedIn(false)
            }
        }).catch(e => {
            console.log("Error: " + e)
        })

        // axios.get("http://localhost:8080/authenticate", {
        //     email,
        //     password
        // }).then(result => {
        //     console.log(result)
        // }).catch(e => {
        //     console.log("Error: " + e)
        // })

    }

    return (
        <div >
            <Form className="form-margins">
                <Form.Group className="center-content" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={
                            e => {
                                setEmail(e.target.value);
                            }
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
            </Form>

        </div>

    )
}


export default Login;