import React, { } from 'react'
import { navigate } from "@reach/router"
import { Button } from 'react-bootstrap'
import './Login.css'



function AdminPage({ isAdmin, email }) {

    function redirect(path) {
        console.log("path = " + path)
        navigate(path)
    }

    if (isAdmin) {
        return (
            <div className="btn-div">
                <Button variant="primary" size="lg" className="btns-size" block onClick={e => redirect('/admin/manageUsers')}>
                    Manage User Accounts
            </Button>
                <Button variant="primary" size="lg" className="btns-size" block onClick={e => redirect('/admin/assignRoles')} >
                    Assign Roles
            </Button>
                <Button variant="primary" size="lg" className="btns-size" block >
                    Help Desk
            </Button>
            </div>
        )
    } else {
        return null
    }
}

export default AdminPage;
