import React from 'react';
export const LoginContext = React.createContext();

function LoginProvider(props) {
  const [loggedIn, setLogin] = React.useState(false);
  const [user, setUser] = React.useState({});

  const login = (username, password) => {
    let user = {
      username: username,
      password: password,
    };
    setUser(user);
    setLogin(true);
  };

  const logout = () => {
    setUser({});
    setLogin(false);
  };

  return (
    <LoginContext.Provider value={{user, loggedIn, login, logout}}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;