import React, { useState, useEffect } from 'react'
import NavigBar from './NavigBar'

import * as utils from './utils'
import Views from './views'

const App = () => {
    const [current_view, setCurrent_view] = useState(<div />)

    useEffect(() => {
        if (utils.isLoggedIn()) {
            if (utils.isBanned()) {
                return setCurrent_view(Views.banned({ setCurrent_view: setCurrent_view }))
            }

            return setCurrent_view(Views.dashboard({ setCurrent_view: setCurrent_view }))
        }

        setCurrent_view(Views.login({ setCurrent_view: setCurrent_view }))
    }, [])

    return (
        <div className='App'>
            <NavigBar setCurrent_view={ setCurrent_view }/>
            { current_view }
        </div>
    )
}

export default App