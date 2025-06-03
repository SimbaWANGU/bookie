import {
  View,
  SectionList,
  ActivityIndicator,
  Text
} from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@utils/supabase'
import { userAtom } from '@stores/user.state'
import { useAtom } from 'jotai'
import tw from '@utils/tailwind'
import { QueryKeys } from '@constants/QueryKeys'
import BookClubCard from './BookClubCard'
import { BookClubMember } from '@models/club.type'

interface onClickClubProps {
  onOpenClub: Dispatch<SetStateAction<boolean>>
}

const ClubsList: React.FC<onClickClubProps> = ({  }) => {
  const [user] = useAtom(userAtom)

  const { data: clubsList, isLoading } = useQuery<BookClubMember[]>({
    queryKey: [QueryKeys.myClubs],
    queryFn: async () => {
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
        .eq('user_id', user?.id)

      if (error) {
        throw new Error(error.message)
      }

      return data
    }
  })

  if (isLoading) {
    return <ActivityIndicator size="large" style={tw`mt-10`} />
  }

  const invitedClubs = clubsList!.filter(club => club.status === 'INVITED') || []
  const acceptedClubs = clubsList!.filter(club => club.status === 'ACCEPTED') || []

  const sections: { title: string, data: BookClubMember[] }[] = []

  if (invitedClubs.length > 0) {
    sections.push({ title: 'Invites', data: invitedClubs })
  }

  if (acceptedClubs.length > 0) {
    sections.push({ title: 'My Clubs', data: acceptedClubs })
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.book_club_id}
      contentContainerStyle={tw`px-4 pb-10`}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={tw`text-lg font-bold text-gray-700 mt-4 mb-2`}>
          {title}
        </Text>
      )}
      renderItem={({ item }) => (
        <BookClubCard
          {...item}
          // onOpenClub={onOpenClub}
        />
      )}
      ListEmptyComponent={
        <Text style={tw`text-center text-gray-500 mt-10`}>
          You are not part of any book clubs yet.
        </Text>
      }
    />
  )
}

export default ClubsList