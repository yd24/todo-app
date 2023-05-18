import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from './Components/Settings';
import NavbarSimple from './Components/Nav';
import Header from './Components/Header';
import Todo from './Components/Todo';
import List from './Components/List';
import Footer from './Components/Footer';
import TodoProvider from './Context/Settings';

import './App.scss';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <NavbarSimple />
            <Routes>
              <Route
                exact path='/'
                element={
                  <div>
                    <TodoProvider>
                      <Header />
                      <Todo />
                      <List />
                    </TodoProvider>
                  </div>
                }
              >
              </Route>

              <Route
                path='/settings'
                element={<Settings />}
              >
              </Route>
            </Routes>
        </div>
        <Footer />
      </Router>
    );
  }
}
