import { Switch, NumberInput } from '@mantine/core';
import { TodoContext } from '../../Context/Settings';
import { useContext, useState } from 'react';

function Settings() {
  const todo = useContext(TodoContext);
  const [updated, setUpdated] = useState(false);

  return todo.loggedIn ? (
    <>
      <div>
        <h1>Settings</h1>
        <Switch checked={todo.defaultValues.showCompleted} onChange={(e) => { setUpdated(false); todo.toggleShowCompleted(); }}label='Show completed items.' />
        <NumberInput value={todo.defaultValues.numItemsToShow} label='Max number of items to display.' min={1} max={10} onChange={(e) => { setUpdated(false); todo.updateItemsToShow(e); }}/>
        <button onClick={() => {setUpdated(true); todo.saveSettings();}}>Save Settings</button>
      </div>
      {updated
      &&
        <div>
          <h2>Updated settings:</h2>
          <p>Show completed items: {todo.defaultValues.showCompleted.toString()}</p>
          <p>Max number of items to show: {todo.defaultValues.numItemsToShow}</p>
        </div>
      }
    </>
  )
  :
  null;
}

export default Settings;