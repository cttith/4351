import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import './Home.css'

function Home({ isAuth, email }) {
    const [linkNames, setLinkNames] = useState([])


    // retrieve links
    useEffect(() => {
        let url = 'http://localhost:8080/permissions/' + JSON.stringify(email)

        fetch(url).then(result => {
            return result.json()
        }).then(result => {
            let jsonString = JSON.stringify(result)
            jsonString = jsonString.replace(/["]/g, '')
            jsonString = jsonString.replace(/^\[([\s\S]*)]$/, '$1')
            console.log("updating")
            console.log("jsonString = " + jsonString)
            setLinkNames(jsonString.split(','))
        }).catch(e => {
            console.log("Error: " + e)
        })
    }, [])

    function retrieveLinkNames() {
        console.log("current email : " + email)
    }

    function ReturnButtonLinks() {
        if (linkNames.length > 0) {
            return (
                linkNames.map((link) =>
                    <Button variant="primary" size="lg" className="btns-size" block onClick={retrieveLinkNames}>
                        {link}
                    </Button>
                )
            )
        } else {
            return null
        }
    }

    if (isAuth) {
        return (
            <div className="btn-div">
                <ReturnButtonLinks />
            </div>
        )
    } else {
        return (
            <div>
                <header> PLEASE LOGIN</header>
            </div>
        )
    }

}

export default Home;