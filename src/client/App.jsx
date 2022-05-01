import React, { useState, useEffect } from 'react'
import NavigBar from './NavigBar'
import Login from './Login'

const App = () => {
    return (
        <div className='App'>
            <NavigBar />
            <Login />
        </div>
    )
}

export default App