import React from 'react';
import {If, Then, Else} from 'react-if';
import { Navigate } from "react-router-dom";

import { LoginContext } from '../../Context/Login';

function Login(props) {

  const context = React.useContext(LoginContext);

  const isLoggedIn = context.loggedIn;
  const canDo = props.capability ? context.can(props.capability) : true;
  const okToRender = isLoggedIn && canDo;

  return (
    <If condition={okToRender}>
      <Then>
        {props.children}
      </Then>
      <Else>
        <Navigate to='/login' replace />
      </Else>
    </If>
  );
}

export default Login;
