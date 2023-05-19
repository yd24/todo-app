import Header from '../Header';
import Todo from '../Todo';
import List from '../List';
import LoginPage from '../LoginPage';
import { TodoContext } from '../../Context/Settings';
import { useContext } from 'react';

function Main() {
  const todo = useContext(TodoContext);

  return todo.loggedIn ? (
    <div>
      <Header />
      <Todo />
      <List />
    </div>
  )
  :
  (<LoginPage />);
}

export default Main;