import { saveUserToken } from '../utils/auth'
import { login } from '../apis/auth'

function requestLogin () {
  return {
    type: 'LOGIN_REQUEST',
    isFetching: true,
    isAuthenticated: false
  }
}

export function receiveLogin (user) {
  console.log("receive")
  return {
    type: 'LOGIN_SUCCESS',
    isFetching: false,
    isAuthenticated: true,
    user
  }
}

export function receiveLogout () {
  return {
    type: 'LOGOUT_SUCCESS'
  }
}

export function loginError (message) {
  return {
    type: 'LOGIN_FAILURE',
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function loginUser (creds) {
  return dispatch => {
    dispatch(requestLogin(creds))
    return login(creds)
      .then((token) => {
        const userInfo = saveUserToken(token)
        dispatch(receiveLogin(userInfo))
        document.location = '/#/'
      })
      .catch(err => {
        dispatch(loginError(err.response.body.message))
      })
  }
}
