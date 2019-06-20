import React, { Component, Fragment } from 'react'
import { Switch, withRouter, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from 'components/Login'
import UserPage from 'components/UserPage'
import PrivateRoute from 'components/PrivateRoute'
import {
  logout,
  getIsAuthorized,
  getIsNetworkErrorPresent,
  getMessage
} from 'ducks'
import { Button, Alert } from 'reactstrap'

import './AppRouter.css'

export class AppRouter extends Component {
  handleLogout = () => {
    const { logout } = this.props

    logout()
  }

  render() {
    const { isAuthorized, isErrorExist, errorMessage } = this.props

    return (
      <Fragment>
        {isAuthorized && (
          <div className="login-notes">
            <Button onClick={this.handleLogout}>Logout</Button>
          </div>
        )}

        {isErrorExist && (
          <Alert color="danger" className="login-notes">
            <p className="error">{errorMessage}</p>
          </Alert>
        )}

        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute
            path="/users/me"
            component={UserPage}
            isAuthorized={isAuthorized}
            exact
          />
          <PrivateRoute
            path="/users/:name"
            component={UserPage}
            isAuthorized={isAuthorized}
          />
          <Redirect to="/users/me" />
        </Switch>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthorized: getIsAuthorized(state),
    isErrorExist: getIsNetworkErrorPresent(state),
    errorMessage: getMessage(state)
  }
}

const mapDispatchToProps = {
  logout
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppRouter)
)
