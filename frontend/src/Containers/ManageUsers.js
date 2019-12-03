import React, { useState, useEffect } from 'react'
import { Accordion, Card, Button, Form, Col, Alert } from 'react-bootstrap'
import './ManageUsers.css'
import './Login.css'
import '../App.css'
import { navigate } from '@reach/router/lib/history';
/*
Add/delete users
*/
function ManageUsers() {
    const [users, setUsers] = useState([])
    const [newEmail, setEmail] = useState("")
    const [newPassword, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailAlert, setEmailAlert] = useState(false)
    const [createdAlert, setCreatedAlert] = useState(false)

    // fetch all
    useEffect(() => {
        let url = "http://localhost:8080/allEmployees"
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(result => {
                // console.log("result = " + JSON.stringify(result))
                // console.log("name = " + result[0].firstName)
                parseResults(result)
            }).catch(e => {
                console.log("Error: " + e)
            })
    }, [])



    useEffect(() => {
        console.log("new users = " + JSON.stringify(users))
        setTimeout(setCreatedAlert(false), 3000)
    }, [users])

    function parseResults(result) {
        var users = []
        result.forEach(function (item, index) {
            if (item.email === "Admin") {
                return;
            }
            let newUser = {
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.email,
                index: index
            }
            users.push(newUser)
            console.log(newUser)
        })
        setUsers(users)
    }

    function removeUser(user) {
        let url = "http://localhost:8080/remove/" + user.email
        console.log("email to remove = " + user.email)
        fetch(url)
            .then(response => {
                return response.json()
            }).then(result => {
                const emailToDelete = user.email
                const index = users.findIndex(user => user.email === emailToDelete)
                let newUsers = [
                    ...users.slice(0, index),
                    ...users.slice(index + 1)
                ]
                setUsers(newUsers)

            })
    }

    function addUser() {
        console.log("email = " + newEmail)
        console.log("password = " + newPassword)
        console.log("first name = " + firstName)
        console.log("last name = " + lastName)
        let newUser = {
            firstName: firstName,
            lastName: lastName,
            email: newEmail,
            password: newPassword,
            index: users.length + 1
        }

        let url = "http://localhost:8080/create/employee"
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json()
        }).then(result => {
            result = JSON.parse(result)
            if (result === 1) {
                let newUsers = [
                    ...users, newUser
                ]
                setUsers(newUsers)
                console.log("email created!")
                setCreatedAlert(true)
                setEmailAlert(false)
            } else {
                console.log("email already taken")
                setEmailAlert(true)
            }
        }).catch(e => {
            console.log("Error: " + e)
        })
    }

    function EmailAlert() {
        if (emailAlert) {
            return (
                <Alert variant="danger" className="alert-margins">
                    <Alert.Heading>Email already taken!</Alert.Heading>
                </Alert>
            )
        } else {
            return null
        }
    }

    function CreatedAlert() {
        if (createdAlert) {
            return (
                <Alert variant="success" className="alert-margins">
                    <Alert.Heading>User Created!</Alert.Heading>
                </Alert>
            )
        } else {
            return null
        }
    }

    function UserAccordion() {
        if (users.length > 0) {
            return (
                users.map((user) =>
                    <Accordion key={user.email} className="accordion-size">
                        <Card key={user.email}>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    {user.email}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Button variant="danger" key={user.email} onClick={e => removeUser(user)}> Remove User </Button>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                )
            );
        } else {
            return null
        }
    }

    const goBack = e => {
        navigate("/admin")
    }

    return (
        <div className="accordion-div">
            <strong className="title"> Accounts </strong>
            <UserAccordion />
            <Accordion className="accordion-size">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Add new user!
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" onChange={
                                            e => {
                                                setEmail(e.target.value);
                                            }
                                        } />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" onChange={
                                            e => {
                                                setPassword(e.target.value);
                                            }
                                        } />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="firstName" placeholder="Enter first name" onChange={
                                            e => {
                                                setFirstName(e.target.value);
                                            }
                                        } />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="lastName" placeholder="Enter last name" onChange={
                                            e => {
                                                setLastName(e.target.value);
                                            }
                                        } />
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                            <Button onClick={e => addUser()}> Add User </Button>
                            <EmailAlert />
                            <CreatedAlert />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <Button onClick={goBack} href="/admin" className="back-btn" > Back </Button>
        </div>
    )


}

export default ManageUsers;