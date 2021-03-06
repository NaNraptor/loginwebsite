import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

import NavigBarUserDrop from './NavigBarUserDrop'

import * as utils from './utils'

const NavigBar = (props) => {
    return (
        <Navbar variant='dark' bg='dark' className='mb-5'>
            <Container fluid>
                <Navbar.Brand href='/'>Login Website</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse className='justify-content-end'>
                    <Nav>
                        {utils.isLoggedIn() ? <NavigBarUserDrop setCurrent_view={ props.setCurrent_view }/> : <div />}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigBar