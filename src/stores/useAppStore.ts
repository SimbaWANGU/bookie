import { create } from 'zustand'

type AppState = {
  firstTimeOnApp: boolean
  setFirstTimeOnApp: (firstTimeOnApp: boolean) => void
};

export const useAppStore = create<AppState>((set) => ({
  firstTimeOnApp: true,
  setFirstTimeOnApp: (firstTimeOnApp: boolean) => set({ firstTimeOnApp }),
}))
