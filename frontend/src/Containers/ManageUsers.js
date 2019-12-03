import React, { useState, useEffect } from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'
import './ManageUsers.css'
/*
Add/delete users
*/
function ManageUsers() {
    const [users, setUsers] = useState([])

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



    function UserAccordion() {
        if (users.length > 0) {
            return (
                users.map((user) =>
                    <Accordion key={user.email}>
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


    return (
        <div>
            <UserAccordion />
        </div>
    )


}

export default ManageUsers;