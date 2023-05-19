import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from './Components/Settings';
import NavbarSimple from './Components/Nav';
import Main from './Components/Main';
import Footer from './Components/Footer';
import TodoProvider from './Context/Settings';

import './App.scss';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <TodoProvider>
            <NavbarSimple />
            <Routes>
              <Route
                exact path='/'
                element={<Main />}
              >
              </Route>

              <Route
                path='/settings'
                element={<Settings />}
              >
              </Route>
            </Routes>
          </TodoProvider>
        </div>
        <Footer />
      </Router>
    );
  }
}
