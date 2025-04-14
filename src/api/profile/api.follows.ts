import { supabase } from '@utils/supabase'

const authorFollows = async (id: string) => {
  const { count, error } = await supabase
    .from('users_follow_creators')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', id)

  if (error) {
    throw new Error(error.message)
  }

  return count
}

const userFollowingCount = async (id: string) => {
  const { count, error } = await supabase
    .from('user_follows_user')
    .select('*', { count: 'exact', head: true })
    .eq('follower', id)

  if (error) {
    throw new Error(error.message)
  }

  return count
}

const userFolloweeCount = async (id: string) => {
  const { count, error } = await supabase
    .from('user_follows_user')
    .select('*', { count: 'exact', head: true })
    .eq('followee', id)

  if (error) {
    throw new Error(error.message)
  }

  return count
}

export {
  authorFollows,
  userFollowingCount,
  userFolloweeCount
}