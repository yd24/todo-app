import { Switch, NumberInput } from '@mantine/core';
import { SettingsContext } from '../../Context/Settings';

import { useContext, useState } from 'react';
import { When } from 'react-if';

function Settings() {
  const settings = useContext(SettingsContext);
  const [updated, setUpdated] = useState(false);

  return (
    <>
      <div>
        <h1>Settings</h1>
        <Switch checked={settings.defaultValues.showCompleted} onChange={(e) => { setUpdated(false); settings.toggleShowCompleted(); }}label='Show completed items.' />
        <NumberInput value={settings.defaultValues.numItemsToShow} label='Max number of items to display.' min={1} max={10} onChange={(e) => { setUpdated(false); settings.updateItemsToShow(e); }}/>
        <button onClick={() => {setUpdated(true); settings.saveSettings();}}>Save Settings</button>
      </div>
      <When condition={updated}>
        <div>
          <h2>Updated settings:</h2>
          <p>Show completed items: {settings.defaultValues.showCompleted.toString()}</p>
          <p>Max number of items to show: {settings.defaultValues.numItemsToShow}</p>
        </div>
      </When>
    </>

  );
}

export default Settings;