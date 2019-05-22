import React, { Component } from "react";
import { connect } from 'react-redux';
import { loginUser, loginError } from '../../actions/login';

class LoginReo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this)
  }

  handleChange(e) {
    console.log("changing")
    e.preventDefault()
    const { name, value } = e.target
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  submit(e) {
    console.log("submitting")
    e.preventDefault()
    let { email, password } = this.state
    this.props.dispatch(loginUser({ email, password }))
    window.location = `/#/explore`
  }

  render() {
    return (

      <div className="login-wrapper">

        <form
          onSubmit={this.submit}
          noValidate
          className="login-wrapper" >

          <h2 className="loginHeader" >Takiuru</h2>

          <input className="loginInput" name="email" type="text" placeholder="īmera" noValidate onChange={this.handleChange} />

          <br></br>
          <input className="loginInput" name="password" type="password" placeholder="kupuhipa" noValidate onChange={this.handleChange} />
          <br></br>
          <button className="loginButton" name="submit">Takiuru</button>
        </form>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    lang: state.toggle
  }
}


export default connect(mapStateToProps)(LoginReo) 