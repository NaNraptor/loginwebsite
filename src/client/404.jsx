import React, { Component } from 'react'
import './404.css'
import NavigBar from './NavigBar'

class App extends Component {
  render(){
    return(
      <div className='_404'>
        <NavigBar />
        <h1> Nothing to see here! 404! </h1>
      </div>
    )
  }
}

export default App