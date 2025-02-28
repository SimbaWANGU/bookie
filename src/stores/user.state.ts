import { Session, User } from '@supabase/supabase-js'
import { atom } from 'jotai'

const userAtom = atom<User | null>(null)

export {
  userAtom
}