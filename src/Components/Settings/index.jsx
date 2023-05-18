import { Switch, NumberInput } from '@mantine/core';

function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <Switch label='Show only incomplete items.' />
      <NumberInput defaultValue={3} label='Max number of items to display.' min={1} max={10}/>
    </div>
  );
}

export default Settings;