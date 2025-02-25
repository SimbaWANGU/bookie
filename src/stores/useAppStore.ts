import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set) => ({
      firstTimeOnApp: true,
      setFirstTimeOnApp: (firstTimeOnApp: boolean) => set({ firstTimeOnApp }),
      }),
      {
        name: 'firstTimeonApp-Storage',
        storage: createJSONStorage(() => AsyncStorage),
        onRehydrateStorage: () => {
          async function startRemote () {
            setTimeout(() => {
              console.log('first time on app:')
            }, 2000)
          }

          startRemote()

          return (_, error) => {
            if (error) {
              console.log('failed')
            } else {
              console.log('remote state updated')
            }
          }
        }
      }
  )
)
