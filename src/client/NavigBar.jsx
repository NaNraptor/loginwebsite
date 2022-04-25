import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

import NavigBarUserDrop from './NavigBarUserDrop'

const NavigBar = () => {
    return (
        <Navbar bg="light">
        <Container fluid>
            <Navbar.Brand href="/">Login Website</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <NavigBarUserDrop />
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default NavigBar