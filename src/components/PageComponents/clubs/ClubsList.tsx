import { SectionList, ActivityIndicator, Text, useColorScheme } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { userAtom } from '@stores/user.state'
import { useAtom } from 'jotai'
import tw from '@utils/tailwind'
import { QueryKeys } from '@constants/QueryKeys'
import BookClubCard from './BookClubCard'
import { BookClubMember } from '@models/club.type'
import { getMyClubList } from '@api/clubs/api.clubs'
import { QuickSandTextMedium, QuickSandTextRegular } from '@components/styled/StyledText'

const ClubsList = () => {
  const [user] = useAtom(userAtom)
  const theme = useColorScheme()

  const { data: clubsList, isLoading } = useQuery<BookClubMember[]>({
    queryKey: [QueryKeys.myClubs],
    queryFn: async () => await getMyClubList(user?.id as string)
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
        <QuickSandTextMedium style={tw`text-lg font-bold android:my-4 ios:my-1 ${theme === 'light' ? 'text-dark' : 'text-light'}`}>
          {title}
        </QuickSandTextMedium>
      )}
      renderItem={({ index, item }) => <BookClubCard key={`${index}-${item.book_club_id}`} item={item} />}
      ListEmptyComponent={
        <QuickSandTextMedium style={tw`text-center text-gray-500 mt-10`}>
          You are not part of any book clubs yet.
        </QuickSandTextMedium>
      }
    />
  )
}

export default ClubsList