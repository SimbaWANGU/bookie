import { userAtom } from '@stores/user.state'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@utils/supabase'
import { useAtom } from 'jotai'

const useUserIsFollowed = () => {
  const [user] = useAtom(userAtom)
  
  const { data, isLoading, error } = useQuery<{ follower: string }[]>({
    queryKey: ['Users is Followed', user?.id],
    queryFn: async () => { 
      const { data: follows, error: followsError } = await supabase
        .from('user_follows_user')
        .select('follower')
        .eq('followee', user?.id)
  
      if (followsError) {
        throw new Error(followsError.message)
      }
  
      return follows
    },
    enabled: !!user?.id
  })

  return { data, isLoading, error }
}

export default useUserIsFollowed