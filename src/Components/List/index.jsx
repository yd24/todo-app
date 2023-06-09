import { useContext } from 'react';
import { TodoContext } from '../../Context/Results';
import { SettingsContext } from '../../Context/Settings';
import { LoginContext } from '../../Context/Login';
import { Pagination } from '@mantine/core';
import { When } from 'react-if';

import './list.scss';

function List() {
  const todo = useContext(TodoContext);
  const settings = useContext(SettingsContext);
  const login = useContext(LoginContext);

  function toggleComplete(id) {
    if (login.can('update')) {
      const items = todo.list.map( item => {
        if ( item.id === id ) {
          item.complete = ! item.complete;
        }
        return item;
      });
      todo.setList(items);
    }
  }

  function setActivePage(e) {
    todo.setPage(e);
    let initialList = settings.defaultValues.showCompleted ? todo.list : todo.incomplete;
    todo.setResults(initialList, e);
  }

  const inputList = settings.defaultValues.showCompleted ? todo.list : todo.incomplete;
  const totalPages = Math.ceil(inputList.length / settings.defaultValues.numItemsToShow);
  return (
    <When condition={login.can('read')}>
      {todo.resultsList.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
        </div>
      ))
      }
      <Pagination className='pagination' value={todo.activePage} onChange={setActivePage} total={totalPages} position='center'/>
    </When>
  );
}

export default List;