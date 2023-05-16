import React from 'react';

import Header from './Components/Header';
import Todo from './Components/Todo';
import List from './Components/List';
import Footer from './Components/Footer';
import TodoProvider from './Context/Settings';

export default class App extends React.Component {
  render() {
    return (
      <>
        <TodoProvider>
          <Header />
          <Todo />
          <List />
        </TodoProvider>
        <Footer />
      </>
    );
  }
}
