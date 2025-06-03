import { useQuery } from "@tanstack/react-query"
import useUserFollows from "./profile/useUserFollows"
import { supabase } from "@utils/supabase"

const useInviteUsers = () => {
  const { data: followedUsers, isLoading: followedUsersLoading } = useUserFollows()

  const { data: users, isLoading, error } = useQuery({
    queryKey: [''],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .in('id', followedUsers!)

        if (error) {
          throw new Error(error.message)
        }

        return data
    },
    enabled: !followedUsersLoading
  })
}

export default useInviteUsers