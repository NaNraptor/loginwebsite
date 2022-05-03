import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'

import * as utils from './utils'
import Views from './views'

// This could be improved, lots of repeated code
const NavigBarUserDrop = (props) => {
    const onProfile = () => {
        if (utils.isBanned()) {
            props.setCurrent_view(Views.banned({ setCurrent_view: props.setCurrent_view }))
            return
        }
        props.setCurrent_view(Views.profile({ setCurrent_view: props.setCurrent_view }))
    }

    const onDashboard = () => {
        if (utils.isBanned()) {
            props.setCurrent_view(Views.banned({ setCurrent_view: props.setCurrent_view }))
            return
        }
        props.setCurrent_view(Views.dashboard({ setCurrent_view: props.setCurrent_view }))
    }

    const onAdminDashboard = () => {
        if (utils.getAccessRank() != 0) return

        props.setCurrent_view(Views.admin_dashboard({ setCurrent_view: props.setCurrent_view }))
    }

    const onLogout = async () => {
        const result = await utils.logout()
        
        if (result.success) {
            props.setCurrent_view(Views.login({ setCurrent_view: props.setCurrent_view }))
            utils.deleteAllCookies()
        }
    }

    const renderAdditionalMenus = () => {
        let menus = []
        if (utils.getAccessRank() == 0) {
            menus.push(<NavDropdown.Item key='admin_dashboard' onClick={ () => onAdminDashboard() }>Admin Dashboard</NavDropdown.Item>)
        }

        return menus
    }

    return (
        <NavDropdown title={ utils.isLoggedIn() ? `Signed in as: ${ utils.getLoggedInUser()}` : '' }>
            <NavDropdown.Item onClick={ () => onProfile() }>Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={ () => onDashboard() }>Dashboard</NavDropdown.Item>
            { renderAdditionalMenus() }
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={ () => onLogout() }>Logout</NavDropdown.Item>
        </NavDropdown>
    )
}

export default NavigBarUserDrop