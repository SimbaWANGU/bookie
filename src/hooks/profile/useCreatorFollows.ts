import { QueryKeys } from '@constants/QueryKeys'
import { userAtom } from '@stores/user.state'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@utils/supabase'
import { useAtom } from 'jotai'

const useCreatorFollows = () => {
  const [user] = useAtom(userAtom)

  const { data, isLoading, error } = useQuery<{ creator_id: string, avatar_url: string }[]>({
    staleTime: Infinity,
    queryKey: [QueryKeys.authorsFollowed, user?.id],
    queryFn: async () => { 
      const { data: follows, error: followsError } = await supabase
        .from('users_follow_creators')
        .select('*')
        .eq('user_id', user?.id)

      if (followsError) {
        throw new Error(followsError.message)
      }

      return follows
    }
  })

  return { data, isLoading, error }
}

export default useCreatorFollows