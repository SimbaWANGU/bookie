import { userProfile } from '@models/userProfile.type'
import { Session } from '@supabase/supabase-js'
import { create } from 'zustand'

type UserState = {
  session: Session | null
  setSession: (session: Session | null) => void
  userProfile: userProfile
  setUserProfile: (userProfile: userProfile) => void
  profilePicture: string
  setProfilePicture: (profilePicture: string) => void
};

export const useUserStore = create<UserState>((set) => ({
  session: null,
  setSession: (session: Session | null) => set({ session }),
  userProfile: {} as userProfile,
  setUserProfile: (userProfile: userProfile) => set({ userProfile }),
  profilePicture: '',
  setProfilePicture: (profilePicture: string) => set({ profilePicture }),
}))
