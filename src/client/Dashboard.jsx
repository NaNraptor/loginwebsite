import React, { useState, useEffect } from 'react'

import * as utils from './utils'
import Views from './views'

const Dashboard = (props) => {
    useEffect(() => {
        if (!utils.isLoggedIn()) {
            return props.state.setCurrent_view(Views.login(props.state))
        }
    }, [])

    return (
        <div className='Dashboard'>
            
        </div>
    )
}

export default Dashboard