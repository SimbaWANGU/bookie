import React from 'react'
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native'
import { Image } from 'expo-image'
import tw from '@utils/tailwind'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@utils/supabase'
import { BookClubMember } from '@models/club.type'
import { QueryKeys } from '@constants/QueryKeys'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'

const BookClubCard: React.FC<BookClubMember> = ({ book_clubs, status, book_club_id }) => {
  const [user] = useAtom(userAtom)
  const theme = useColorScheme()
  const queryClient = useQueryClient()
  const currentRead = book_clubs.book_club_reads?.[0]?.books

  const acceptInviteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('book_club_members')
        .update({ status: 'ACCEPTED' })
        .eq('book_club_id', book_club_id)
        .eq('user_id', user?.id)

      if (error) throw new Error(error.message)
    },
    onSuccess: () => {
      // ! not causing a refetch of clubs upon accepting invite
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: [QueryKeys.myClubs] })
      }, 1000)
    }
  })

  const handleAcceptInvite = () => {
    acceptInviteMutation.mutate()
  }

  return (
    <View style={tw`${theme === 'light' ? 'bg-white' : 'bg-black'} rounded-lg p-4 mb-3 shadow-md`}>
      <Text style={tw`text-xl font-bold ${theme === 'light' ? 'text-dark' : 'text-light'}`}>{book_clubs.club_name}</Text>
      <View style={tw`mt-4`}>
        {currentRead ? (
          <View style={tw`flex-row`}>
            <Image
              source={{ uri: currentRead.cover_image_url }}
              style={tw`w-16 h-24 rounded mr-4`}
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-base font-semibold ${theme === 'light' ? 'text-dark/85' : 'text-light/85'}`}>{currentRead.title}</Text>
              <Text style={tw`text-xs ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'} mt-1`} numberOfLines={3}>
                {currentRead.description}
              </Text>
            </View>
          </View>
        ) : (
          <View style={tw`bg-gray-100 p-4 rounded`}>
            <Text style={tw`text-sm text-gray-600 italic`}>No book has been selected as the current read.</Text>
          </View>
        )}
      </View>

      {status === 'INVITED' && (
        <TouchableOpacity
          style={tw`mt-4 bg-accent p-4 rounded-full w-6/12 self-center`}
          onPress={handleAcceptInvite}
          disabled={acceptInviteMutation.isPending}
        >
          <Text style={tw`text-white text-center font-semibold`}>
            {acceptInviteMutation.isPending ? 'Accepting...' : 'Accept Invite'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default BookClubCard