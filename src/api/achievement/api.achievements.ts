import { supabase } from "@utils/supabase"

const addNewAchievement = async (user_id: string, key: string) => {
  const { error } = await supabase.from('user_achievements').insert([{
      user_id,
      key
    }
  ])

  if (error) {
    throw new Error(error.message)
  }
}

const retrieveAchievements = async (user_id: string) => {
  const { data, error } = await supabase.from('user_achievements').select('*').eq('user_id', user_id)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export {
  addNewAchievement,
  retrieveAchievements
}