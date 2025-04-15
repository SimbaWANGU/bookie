import { QueryKeys } from '@constants/QueryKeys'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@utils/supabase'

interface useOtherUserFollowsProps {
  id: string
}

const useOtherUserFollows = ({ id }: useOtherUserFollowsProps) => {

  console.log(id)
  
  const { data, isLoading, error } = useQuery<{ followee: string }[]>({
    queryKey: [QueryKeys.usersFollowedByOtherUser, id],
    queryFn: async () => { 
      const { data: follows, error: followsError } = await supabase
        .from('user_follows_user')
        .select('followee')
        .eq('follower', id)
  
      if (followsError) {
        throw new Error(followsError.message)
      }
  
      return follows
    },
    enabled: !!id
  })

  return { data, isLoading, error }
}

export default useOtherUserFollows