import React from 'react'
import { Switch } from 'react-native'

const SettingsSwitch = ({ value, onChange }: { value: boolean, onChange: (val: boolean) => void }) => (
  <Switch value={value} onValueChange={onChange} />
)

export default SettingsSwitch