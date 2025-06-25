import { CustomUser } from '@models/userProfile.type'
import { supabase } from '@utils/supabase'
import { decode } from 'base64-arraybuffer'

const fetchCustomUser = async (): Promise<CustomUser> => {
  // Get the current session from Supabase
  const { data: sessionData, error } = await supabase.auth.getSession()

  if (sessionData?.session?.user) {
    // Fetch custom user data from your users table
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', sessionData.session.user.id)
      .single()
      
    if (error) {
      throw new Error(error.message)
    }
    return data as CustomUser
  }

  throw new Error('No user session found')
}

const fetchOtherUser = async (id: string): Promise<CustomUser> => {
  const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
      
    if (error) {
      throw new Error(error.message)
    }
    return data as CustomUser
}

const fetchBooksInProgress = async (id: string, status: 'STARTED' | 'UPDATED' | 'COMPLETED') => {
  const { data, error } = await supabase.from('user_reading_progress').select(`
    *,
    books (
      *,
      book_genres (
        genres ( name )
      )
    )
  `)
  .eq('status', status)
  .eq('user_id', id)
  .order('last_updated_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const fetchLikedBooks = async (id: string) => {
  const { data, error } = await supabase.from('user_likes_book').select(`
    *,
    books (
      *,
      book_genres (
        genres ( name )
      )
    )
  `)
  .eq('user_id', id)
  .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const fetchReviewedBooks = async (id: string) => {
  const { data, error } = await supabase.from('user_reviews_book').select(`
    *,
    users (
      *
    ),
    books (
      *,
      book_genres (
        genres ( name )
      )
    )
  `)
  .eq('user_id', id)
  .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

interface UploadAvatarParams {
  filePath: string;
  base64: string;
  contentType: string;
  userId: string;
}

 const uploadAvatar = async ({ filePath, base64, contentType, userId }: UploadAvatarParams) => {
  // Upload the avatar image, using upsert: true to overwrite any existing file.
  const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, decode(base64), { contentType, cacheControl: '31536000', upsert: true })

  if (uploadError) {
    throw new Error(`Failed to upload avatar: ${uploadError.message}`)
  }

  // Get the public URL of the uploaded image.
  const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath)

  // Update the user's record in your custom "users" table with the new avatar URL.
  const { error: updateError } = await supabase
    .from('users')
    .update({ avatar_url: publicUrl })
    .match({ id: userId })

  if (updateError) {
    throw new Error(`Failed to update user record: ${updateError.message}`)
  }

  return publicUrl
}

interface UpdateProfilePayload {
  id: string;
  updateData: Partial<{
    name: string;
    user_name: string;
    bio: string;
  }>;
}

const updateProfile = async ({ id, updateData }: UpdateProfilePayload) => {
  const { data, error } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', id)
    .select()

  if (error) {
    throw error
  }
  return data
}
export {
  fetchCustomUser,
  fetchOtherUser,
  updateProfile,
  fetchBooksInProgress,
  fetchLikedBooks,
  fetchReviewedBooks,
  uploadAvatar,
  
}
