import React from 'react';
export const TodoContext = React.createContext();

function TodoProvider(props) {
  //state values
  const [defaultValues, setDefaultValue] = React.useState({
    difficulty: 4,
    numItemsToShow: 3,
    showCompleted: false,
  });
  const [incomplete, setIncomplete] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [resultsList, setResultsList] = React.useState([]);
  const [activePage, setPage] = React.useState(1);

  const toggleShowCompleted = () => {
    let current = defaultValues.showCompleted;
    setDefaultValue(current);
  }

  const paginateResults = (initialList, currentPage) => {
    let start = currentPage > 1 ? (currentPage - 1) * defaultValues.numItemsToShow : 0;
    let end = currentPage > 1 ? currentPage * defaultValues.numItemsToShow : defaultValues.numItemsToShow;
    let results = initialList.length > defaultValues.numItemsToShow ? initialList.slice(start, end) : initialList;
    return results;
  };

  const setResults = (list, page) => {
    let results = paginateResults(list, page);
    setResultsList(results);
  }

  const saveSettings = () => {
    
  };

  return (
    <TodoContext.Provider value={{defaultValues, list, incomplete, resultsList, activePage, setPage, setResults, setIncomplete, setList, toggleShowCompleted}}>
      {props.children}
    </TodoContext.Provider>
  )
}

export default TodoProvider;

