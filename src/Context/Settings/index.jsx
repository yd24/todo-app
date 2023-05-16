import React from 'react';
export const TodoContext = React.createContext();

function TodoProvider(props) {
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
    switch(defaultValues.showCompleted) {
      case true:
        setDefaultValue({...defaultValues, showCompleted: false});
        break;
      case false:
        setDefaultValue({...defaultValues, showCompleted: true});
        break;
      default:
        setDefaultValue({...defaultValues, showCompleted: true});
    }
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

  return (
    <TodoContext.Provider value={{defaultValues, list, incomplete, resultsList, activePage, setPage, setResults, setIncomplete, setList, toggleShowCompleted}}>
      {props.children}
    </TodoContext.Provider>
  )
}

export default TodoProvider;

