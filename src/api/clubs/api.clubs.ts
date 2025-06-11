import { supabase } from "@utils/supabase"

const getMyClubList = async (user_id: string) => {
  const { data, error } = await supabase
    .from('book_club_members')
    .select(`
      *,
      book_clubs (
        club_name,
        description,
        visibility,
        book_club_reads (
          completed_by,
          books (
            *
          )
        )
      )
    `)
    .eq('user_id', user_id)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const getClubDetails = async (clubId: string) => {
  const { data, error } = await supabase
    .from('book_clubs')
    .select(`
      club_name,
      visibility,
      book_club_reads (
        completed_by,
        books (
          id,
          title,
          cover_image_url,
          description,
          story_paragraphs_count:story_paragraphs(count),
          user_reading_progress (
            total_time_spent,
            current_paragraph,
            paragraph_id,
            status,
            users (
              id,
              name,
              user_name,
              avatar_url
            )
          )
        )
      )
    `)
    .eq('id', clubId)

  if (error) throw new Error(error.message)
  return data
}

export {
  getMyClubList,
  getClubDetails
}