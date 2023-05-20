import React from 'react';
import { SettingsContext } from '../Settings';
export const TodoContext = React.createContext();

function TodoProvider(props) {
  //state values
  const [incomplete, setIncomplete] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [resultsList, setResultsList] = React.useState([]);
  const [activePage, setPage] = React.useState(1);
  const settings = React.useContext(SettingsContext);

  const paginateResults = (initialList, currentPage) => {
    let start = currentPage > 1 ? (currentPage - 1) * settings.defaultValues.numItemsToShow : 0;
    let end = currentPage > 1 ? currentPage * settings.defaultValues.numItemsToShow : settings.defaultValues.numItemsToShow;
    let results = initialList.length > settings.defaultValues.numItemsToShow ? initialList.slice(start, end) : initialList;
    return results;
  };

  const setResults = (list, page) => {
    let results = paginateResults(list, page);
    setResultsList(results);
  }

  return (
    <TodoContext.Provider value={{list, incomplete, resultsList, activePage, setPage, setResults, setIncomplete, setList}}>
      {props.children}
    </TodoContext.Provider>
  );
}

export default TodoProvider;

