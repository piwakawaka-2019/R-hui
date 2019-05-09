import React from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Map from './Map'
import AddRahuiMap from './AddRahuiMap'

export function App({auth}) {
  return (
    <div>  
    <Router>    
      <div className="wrapper">
      Rāhui 
      </div>
      <Route path='/addrahui' render={AddRahuiMap}   />
    </Router>
    <Map/>
    </div>  
  )
}

const mapStateToProps = ({auth}) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(App)
