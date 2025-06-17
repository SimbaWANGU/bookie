import { supabase } from "@utils/supabase";

const getGenres = async () => {
  const { data, error } = await supabase.from('genres').select('id, name').order('name', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export {
  getGenres
}