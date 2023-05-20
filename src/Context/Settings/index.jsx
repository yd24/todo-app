import React from 'react';
export const SettingsContext = React.createContext();

function SettingsProvider(props) {
  const [defaultValues, setDefaultValue] = React.useState({
    difficulty: 4,
    numItemsToShow: 3,
    showCompleted: false,
  });

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


  const saveSettings = () => {
    localStorage.setItem('settings', JSON.stringify(defaultValues));
  };


  React.useEffect(() => {
    if (localStorage.getItem('settings') !== null) {
      let settings = JSON.parse(localStorage.getItem('settings'));
      setDefaultValue(settings);
    }
  }, []);

  return (
    <SettingsContext.Provider value={{defaultValues, toggleShowCompleted, updateItemsToShow, saveSettings}}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;