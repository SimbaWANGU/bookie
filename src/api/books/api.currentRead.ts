import { supabase } from "@utils/supabase"

const currentRead = async () => {
  const { data, error } = await supabase
    .from('user_reading_progress')
    .select(`
      last_updated_at,
      current_paragraph,
      books (
        *,
        story_paragraphs_count: story_paragraphs(count)
      )
    `)
    .order('last_updated_at', { ascending: false })
    .limit(1)

  if (error) {
    throw new Error(error.message)
  }
  return data
}

export { currentRead }