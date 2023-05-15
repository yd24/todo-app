import { useContext } from 'react';
import { TodoContext } from '../../Context/Settings';

function Header() {
  const todo = useContext(TodoContext);
  return (
    <header data-testid="todo-header">
      <h1 data-testid="todo-h1">To Do List: {todo.incomplete.length} items pending</h1>
    </header>
  );
}

export default Header;