//dependencies
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import Settings from './Components/Settings';
import NavbarSimple from './Components/Nav';
import Main from './Components/Main';
import Footer from './Components/Footer';
import Auth from './Components/Auth';
import LoginPage from './Components/LoginPage';

//Context
import TodoProvider from './Context/Results';
import SettingsProvider from './Context/Settings';
import LoginProvider from './Context/Login';

//CSS
import './App.scss';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
            <LoginProvider>
              <NavbarSimple />
              <Routes>
                <Route
                  exact path='/'
                  element={
                    <Auth>
                      <SettingsProvider>
                        <TodoProvider>
                          <Main />
                        </TodoProvider>
                      </SettingsProvider>
                    </Auth>
                  }
                >
                </Route>

                <Route
                  path='/settings'
                  element={
                    <Auth>
                      <SettingsProvider>
                        <Settings />
                      </SettingsProvider>
                    </Auth>
                  }
                >
                </Route>

                <Route
                  path='/login'
                  element={
                    <LoginPage />
                  }
                >
                </Route>
              </Routes>
            </LoginProvider>
        </div>
        <Footer />
      </Router>
    );
  }
}
