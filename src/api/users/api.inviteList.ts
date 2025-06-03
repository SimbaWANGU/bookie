import { BookClub } from "@models/club.type"
import { supabase } from "@utils/supabase"

const createClub = async ({
  name,
  description = '',
  visibility,
}: {
  name: string
  description?: string
  visibility: boolean
}): Promise<BookClub> => {
  const { data, error } = await supabase
    .from('book_clubs')
    .insert([{ club_name: name, description, visibility }])
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const inviteList = async (followedUsers: { followee: string }[]) => {
  const newArray = followedUsers.map(item => item.followee)
  const { data, error } = await supabase.from('users')
    .select(`
      id,
      avatar_url,
      expo_push_token,
      user_name
    `).in('id', newArray)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const setBook = async (book_club_id: string, book_id: string) => {
  const { error } = await supabase.from('book_club_reads').insert([
    { book_club_id, book_id },
  ])

  if (error) {
    throw new Error(error.message)
  }
}

const sendClubInviteNotifications = async ({
  user,
  clubName,
  invitedUsers,
}: {
  user: { id: string; user_name: string }
  clubName: string
  invitedUsers: { id: string; expo_push_token: string }[]
}) => {
  await supabase.functions.invoke('club-invite-notification', {
    body: {
      user: {
        id: user.id,
        user_name: user.user_name,
        club_name: clubName,
      },
      followed: invitedUsers.map(u => ({
        id: u.id,
        expo_push_token: u.expo_push_token ?? '',
      })),
    },
  });
}

const inviteMembersToClub = async ({
  userIds,
  clubId,
  clubName,
  user,
}: {
  userIds: { id: string; avatar_url: string; expo_push_token: string; user_name: string }[]
  clubId: string
  clubName: string
  user: { id: string; user_name: string }
}) => {
  const payload = [
    { user_id: user.id, book_club_id: clubId, role: 'ADMIN', status: 'ACCEPTED' },
    ...userIds.map((invitedUser) => ({
      user_id: invitedUser.id,
      book_club_id: clubId,
      role: 'MEMBER',
      status: 'INVITED',
    })),
  ];

  const { error: insertBookClubMembersError } = await supabase
    .from('book_club_members')
    .insert(payload)

  if (insertBookClubMembersError) {
    throw new Error(insertBookClubMembersError.message)
  }

  await sendClubInviteNotifications({
    user,
    clubName,
    invitedUsers: userIds,
  })
}

const createClubWithInvites = async ({
  name,
  description,
  visibility,
  invitedUserIds,
  usersList,
  currentUser,
  selectedBookId
}: {
  name: string
  description?: string
  visibility: boolean
  invitedUserIds: string[]
  usersList: { id: string; avatar_url: string; expo_push_token: string; user_name: string }[]
  currentUser: { id: string; user_name: string }
  selectedBookId: string
}) => {
  const club = await createClub({ name, description: description ?? '', visibility })

  const invitedUsers = usersList.filter(user => invitedUserIds.includes(user.id))

  await inviteMembersToClub({
    userIds: invitedUsers,
    clubId: club.id,
    clubName: club.club_name,
    user: currentUser
  })

  await setBook(club.id, selectedBookId)

  await sendClubInviteNotifications({
    user: {
      id: currentUser.id,
      user_name: currentUser.user_name
    },
    clubName: club.club_name,
    invitedUsers
  })

  return club
}

export {
  inviteList,
  createClubWithInvites
}