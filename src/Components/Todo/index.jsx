import { useEffect, useContext } from 'react';
import useForm from '../../hooks/form';
import { TodoContext } from '../../Context/Results';
import { SettingsContext } from '../../Context/Settings';
import { LoginContext } from '../../Context/Login';

import { v4 as uuid } from 'uuid';

const Todo = () => {
  const todo = useContext(TodoContext);
  const settings = useContext(SettingsContext);
  const login = useContext(LoginContext);

  const { handleChange, handleSubmit } = useForm(addItem, settings.defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    todo.setList([...todo.list, item]);
  }

  /*function deleteItem(id) {
    const items = todo.list.filter( item => item.id !== id );
    todo.setList(items);
  }*/

  useEffect(() => {
    let incomplete = todo.list.filter(item => !item.complete);
    let initialList = settings.defaultValues.showCompleted ? todo.list : incomplete;
    todo.setIncomplete(incomplete);
    todo.setResults(initialList, todo.activePage);
    document.title = `To Do List: ${incomplete.length}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [todo.list]);  

  return (
    <>
      <form onSubmit={handleSubmit}>

        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={settings.defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label>
          <button type="submit" disabled={!login.can('write')}>Add Item</button>
        </label>
      </form>
    </>
  );
};

export default Todo;
