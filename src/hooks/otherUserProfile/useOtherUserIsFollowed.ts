import { QueryKeys } from '@constants/QueryKeys'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@utils/supabase'

interface useOtherUserIsFollowedProps {
  id: string
}

const useOtherUserIsFollowed = ({ id }: useOtherUserIsFollowedProps) => {  
  const { data, isLoading, error } = useQuery<{ follower: string }[]>({
    queryKey: [QueryKeys.usersFollowingOtherUser, id],
    queryFn: async () => { 
      const { data: follows, error: followsError } = await supabase
        .from('user_follows_user')
        .select('follower')
        .eq('followee', id)

        console.log('fetched and refetched')
  
      if (followsError) {
        throw new Error(followsError.message)
      }
  
      return follows
    },
    enabled: !!id
  })


  return { data, isLoading, error }
}

export default useOtherUserIsFollowed