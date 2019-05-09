import React from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Map from './Map'
// import MapWithDrawingManager from './ReactMap'


export function App({auth}) {
  return (
    <div>  
    <Router>    
      <div className="wrapper">
      Rāhui 
      </div>
    </Router>
    <Map/>
    <MapWithDrawingManager/>
    </div>  
  )
}

const mapStateToProps = ({auth}) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(App)
