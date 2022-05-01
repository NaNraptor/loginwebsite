import React, { useState, useEffect } from 'react'
import NavigBar from './NavigBar'
import Login from './Login'
import Dashboard from './Dashboard'

import * as utils from './utils'

const App = () => {
    const [logged_in, setLogged_in] = useState(utils.isLoggedIn())

    const user_view = (
        <Dashboard />
    )

    const login_view = (
        <Login setLogged_in={setLogged_in}/>
    )

    let current_view = login_view

    if (logged_in) {
        current_view = user_view
    } else {
        current_view = login_view
    }

    return (
        <div className='App'>
            <NavigBar setLogged_in={setLogged_in}/>
            {current_view}
        </div>
    )
}

export default App