import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'

import * as utils from './utils'

const NavigBarUserDrop = (props) => {
    const onLogout = async () => {
        const result = await utils.logout()
        
        if (result.success) {
            props.setLogged_in(false)
        }
    }

    return (
        <NavDropdown title={ utils.isLoggedIn() ? `Signed in as: ${utils.getLoggedInUser()}` : '' }>
            <NavDropdown.Item>Profile</NavDropdown.Item>
            <NavDropdown.Item>Dashboard</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={(e) => onLogout()}>Logout</NavDropdown.Item>
        </NavDropdown>
    )
}

export default NavigBarUserDrop