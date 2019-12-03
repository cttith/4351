import React, { useEffect, useState } from 'react'
import { navigate } from "@reach/router"
import { Button, Accordion, Card, Form, Alert } from 'react-bootstrap'
import './ManageUsers.css'


/*
Add/remove roles from user(s)
*/
function AssignRoles() {
    const [users, setUsers] = useState([])
    const [saveAlert, setSaveAlert] = useState(false)

    useEffect(() => {
        let url = "http://localhost:8080/allEmployees"
        fetch(url)
            .then(response => response.json())
            .then(result => {
                console.log(JSON.stringify(result))
                parseResults(result)
            })
    }, [])

    useEffect(() => {
        setSaveAlert(false)
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
                employeeRoles: item.employeeRoles,
                index: index
            }
            users.push(newUser)
            console.log(newUser)
        })
        setUsers(users)
    }

    const goBack = () => {
        navigate("/admin")
    }

    const addNewRole = (oldRoles, index, role) => {
        var newRole = oldRoles
        let oldUser = users[index]
        newRole.push(role)
        console.log("user = " + JSON.stringify(users[index]))
        let newUser = {
            firstName: oldUser.firstName,
            lastName: oldUser.lastName,
            email: oldUser.email,
            employeeRoles: newRole,
            index: oldUser.index
        }
        let newUsers = [
            ...users.slice(0, index),
            newUser,
            ...users.slice(index + 1)
        ]
        setUsers(newUsers)
    }

    const newRoles = (email, role) => {
        const index = users.findIndex(user => user.email === email)
        console.log("index = " + index)
        let oldRoles = users[index].employeeRoles
        if (oldRoles.length === 0) {
            console.log("creating new array for: " + role)
            addNewRole([], index, role)
            return;
        }
        console.log("old Roles = " + JSON.stringify(oldRoles))
        const roleIdx = oldRoles.findIndex(oldRole => oldRole === role)
        if (roleIdx === -1) {
            // add role
            addNewRole(oldRoles, index, role)
        } else {
            // remove role
            console.log("removing role [" + role + "] to account " + email)
            let oldUser = users[index]
            let newRoles = [
                ...oldRoles.slice(0, roleIdx),
                ...oldRoles.slice(index + 1)
            ]
            let newUser = {
                firstName: oldUser.firstName,
                lastName: oldUser.lastName,
                email: oldUser.email,
                employeeRoles: newRoles,
                index: oldUser.index
            }
            let newUsers = [
                ...users.slice(0, index),
                newUser,
                ...users.slice(index + 1)
            ]
            setUsers(newUsers)
        }
    }

    function saveChanges(email) {
        console.log("save changes for user: " + email)
        const index = users.findIndex(user => user.email === email)
        let user = users[index]
        console.log("USER : " + JSON.stringify(user))
        let data = {
            email: user.email,
            employeeRoles: user.employeeRoles
        }

        let url = "http://localhost:8080/employee/modify/roles"
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(result => {
                if (result === 1) {
                    setSaveAlert(true)
                    console.log("document updated")
                } else {
                    console.log("failed")
                }
            }).catch(e => {
                console.log("Error: " + e)
            })

    }

    function SaveAlert() {
        if (saveAlert) {
            return (
                <Alert variant="success" className="alert-margins accordion-size" >
                    <Alert.Heading>Role Assigned!</Alert.Heading>
                </Alert >
            )
        } else {
            return null
        }
    }

    function findExistingRole(roles, roleToFind, email) {
        const index = roles.findIndex(role => role === roleToFind)
        return index != -1
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
                                    <Form>
                                        {['checkbox'].map(type => (
                                            <div key={user.email} className="mb-3">
                                                <Form.Check inline label="FINANCE_ADMIN" onClick={e => newRoles(user.email, "Finance")} checked={findExistingRole(user.employeeRoles, "Finance", user.email)} />
                                                <Form.Check inline label="SALES_ADMIN" type={type} onClick={e => newRoles(user.email, "Sales")} checked={findExistingRole(user.employeeRoles, "Sales", user.email)} />
                                                <Form.Check inline label="HR_ADMIN" type={type} onClick={e => newRoles(user.email, "HR")} checked={findExistingRole(user.employeeRoles, "HR", user.email)} />
                                                <Form.Check inline label="ENGG_ADMIN" type={type} onClick={e => newRoles(user.email, "Engineering")} checked={findExistingRole(user.employeeRoles, "Engineering", user.email)} />
                                                <Button onClick={() => saveChanges(user.email)}> Save </Button>
                                            </div>
                                        ))}
                                    </Form>
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



    return (
        <div>
            <strong className="title"> ASSIGN ROLES </strong>
            <UserAccordion />
            <SaveAlert />
            <Button onClick={goBack} href="/admin" className="back-btn"> Back </Button>
        </div>
    )
}

export default AssignRoles;