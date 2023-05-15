import React from 'react';
export const TodoContext = React.createContext();

function TodoProvider(props) {
  const [defaultValues, setDefaultValue] = React.useState({
    difficulty: 4,
    numItemsToShow: 3,
    showCompleted: true,
  });

  const [incomplete, setIncomplete] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [currentPageList, setCurrentPageList] = React.useState([]);

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

  const setPageList = (list) => {
    setCurrentPageList(list);
  };

  return (
    <TodoContext.Provider value={{defaultValues, list, incomplete, currentPageList, setPageList, setIncomplete, setList, toggleShowCompleted}}>
      {props.children}
    </TodoContext.Provider>
  )
}

export default TodoProvider;

