import { userProfile } from "@models/userProfile.type"
import { useUserStore } from "@stores/useUserStore"

const useUser = (): [userProfile, (userProfile: userProfile) => void] => {
  const [userProfile, setUserProfile] = useUserStore((state) => [state.userProfile, state.setUserProfile])

  return [userProfile, setUserProfile]
}

export default useUser
