import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component, authenticated, ...props }) => (
  <Route
    {...props}
    render={props =>
      authenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default PrivateRoute
