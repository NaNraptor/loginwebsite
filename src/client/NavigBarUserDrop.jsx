import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'

const NavigBarUserDrop = () => {
    return (
        <NavDropdown title="Signed in as: Username">
            <NavDropdown.Item href="Profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="Dashboard">Dashboard</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="Logout">Logout</NavDropdown.Item>
        </NavDropdown>
    )
}

export default NavigBarUserDrop