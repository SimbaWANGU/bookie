import { atom } from "jotai"

const showCreateClubModalAtom = atom(false)
const showClubDetailsAtom = atom('')

export {
  showClubDetailsAtom,
  showCreateClubModalAtom
}