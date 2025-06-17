import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { useAtom } from 'jotai'
import type { WritableAtom } from 'jotai'
import { Platform, useColorScheme } from 'react-native'

function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as any).then === 'function'
  )
}

type SettingsPickerProps<T> = {
  atom: unknown
  options: { label: string; value: T }[]
}

function SettingsPicker<T extends string>({ atom, options }: SettingsPickerProps<T>) {
  const [value, setValue] = useAtom(atom as WritableAtom<T, unknown[], T>)
  const [resolvedValue, setResolvedValue] = useState<T | undefined>()
  const theme = useColorScheme()

  useEffect(() => {
    let canceled = false

    const resolveValue = async () => {
      const val = await value
      if (!canceled) setResolvedValue(val)
    }

    if (isPromise(value)) {
      resolveValue()
    } else {
      setResolvedValue(value)
    }

    return () => {
      canceled = true
    }
  }, [value])

  return (
    <Picker
      selectedValue={resolvedValue}
      onValueChange={val => setValue(val)}
      style={{
        width: 150,
        backgroundColor: Platform.OS === 'android' ? (theme === 'light' ? '#E5E7EB' : '#1F2124') : undefined,
        color: theme === 'light' ? '#111827' : '#F9FAFB',
        // borderRadius: 12,
      }}
      dropdownIconColor={theme === 'light' ? '#6B7280' : '#D1D5DB'} // Optional: controls dropdown arrow color
    >
      {options.map(opt => (
        <Picker.Item
          key={opt.value}
          label={opt.label}
          value={opt.value}
          color={theme === 'light' ? '#111827' : '#F9FAFB'} // For Android
        />
      ))}
    </Picker>
  )
}

export default SettingsPicker