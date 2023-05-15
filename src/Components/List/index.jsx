import { useContext, useState } from 'react';
import { TodoContext } from '../../Context/Settings';
import { Pagination } from '@mantine/core';

function List() {
  const todo = useContext(TodoContext);
  const [activePage, setPage] = useState(1);
  let tempList = todo.list.length > todo.defaultValues.numItemsToShow ? todo.list.slice(0, todo.defaultValues.numItemsToShow) : todo.list;
  console.log(tempList);
  todo.setPageList(tempList);

  function toggleComplete(id) {
    const items = todo.list.map( item => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
      }
      return item;
    });
    todo.setList(items);
  }

  function updateList(e) {
    let page = e.target.innerHTML * todo.defaultValues.numItemsToShow + 1;
    let prev = (e.target.innerHTML - 1) * todo.defaultValues.numItemsToShow + 1;
    tempList = todo.list.slice(prev, page);
    //todo.setPageList(tempList);
  }

  return (
    <>
    {todo.list.map(item => (
      <div key={item.id}>
        <p>{item.text}</p>
        <p><small>Assigned to: {item.assignee}</small></p>
        <p><small>Difficulty: {item.difficulty}</small></p>
        <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
        <hr />
      </div>
    ))
    }
    <Pagination onClick={updateList} total={(todo.list.length / todo.defaultValues.numItemsToShow) + 1}/>
    </>
  );
}

export default List;