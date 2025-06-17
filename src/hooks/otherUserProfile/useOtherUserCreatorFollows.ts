import { QueryKeys } from '@constants/QueryKeys'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@utils/supabase'

interface useOtherUserCreatorFollowsProps {
  id: string
}

const useOtherUserCreatorFollows = ({ id }: useOtherUserCreatorFollowsProps) => {
  const { data, isLoading, error } = useQuery<{ creator_id: string }[]>({
    staleTime: Infinity,
    queryKey: [QueryKeys.authorsUserFollows, id],
    queryFn: async () => { 
      const { data: follows, error: followsError } = await supabase
        .from('users_follow_creators')
        .select('creator_id')
        .eq('user_id', id)

      if (followsError) {
        throw new Error(followsError.message)
      }

      return follows
    }
  })

  return { data, isLoading, error }
}

export default useOtherUserCreatorFollows