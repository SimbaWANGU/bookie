import { CustomUser } from '@models/userProfile.type'
import { atom } from 'jotai'

const userAtom = atom<CustomUser | null>(null)

export {
  userAtom
}