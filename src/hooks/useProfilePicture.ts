import { useUserStore } from "@stores/useUserStore"

const useProfilePicture = (): [string, (profilepicture: string) => void] => {
  const [profilePicture, setProfilePicture] = useUserStore((state) => [state.profilePicture, state.setProfilePicture])

  return [profilePicture, setProfilePicture]
}

export default useProfilePicture
