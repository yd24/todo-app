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
  const [loggedIn, setLogin] = React.useState(false);
  const [user, setUser] = React.useState({});

  const toggleShowCompleted = () => {
    let current = defaultValues.showCompleted;
    setDefaultValue({
      ...defaultValues,
      showCompleted: !current
    });
  }

  const updateItemsToShow = (value) => {
    setDefaultValue({
      ...defaultValues,
      numItemsToShow: value
    });
  };

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
    localStorage.setItem('settings', JSON.stringify(defaultValues));
  };

  const login = (username, password) => {
    let user = {
      username: username,
      password: password,
    };
    setUser(user);
    setLogin(true);
  };

  const logout = () => {
    setUser({});
    setLogin(false);
  };

  React.useEffect(() => {
    if (localStorage.getItem('settings') !== null) {
      let settings = JSON.parse(localStorage.getItem('settings'));
      setDefaultValue(settings);
    }
  }, []);

  return (
    <TodoContext.Provider value={{user, loggedIn, defaultValues, list, incomplete, resultsList, activePage, login, logout, saveSettings, updateItemsToShow, setPage, setResults, setIncomplete, setList, toggleShowCompleted}}>
      {props.children}
    </TodoContext.Provider>
  )
}

export default TodoProvider;

