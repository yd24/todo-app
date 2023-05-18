import { useContext } from 'react';
import { TodoContext } from '../../Context/Settings';
import { Pagination } from '@mantine/core';

import './list.scss';

function List() {
  const todo = useContext(TodoContext);

  function toggleComplete(id) {
    const items = todo.list.map( item => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
      }
      return item;
    });
    todo.setList(items);
  }

  function setActivePage(e) {
    todo.setPage(e);
    let initialList = todo.defaultValues.showCompleted ? todo.list : todo.incomplete;
    todo.setResults(initialList, e);
  }

  const inputList = todo.defaultValues.showCompleted ? todo.list : todo.incomplete;
  const totalPages = Math.ceil(inputList.length / todo.defaultValues.numItemsToShow);
  return (
    <>
    <Pagination className='pagination' value={todo.activePage} onChange={setActivePage} total={totalPages} position='center'/>
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
    </>
  );
}

export default List;