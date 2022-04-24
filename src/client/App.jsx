import React, { Component } from 'react'
import './app.css'
import NavigBar from './NavigBar'

class App extends Component {
  render(){
    return(
      <div className='App'>
        <NavigBar />
        <h1> Hello, World! </h1>
      </div>
    )
  }
}

export default App