import { QuickSandTextRegular } from '@components/styled/StyledText'
import { hitSlop } from '@constants/HitSlop'
import { QueryKeys } from '@constants/QueryKeys'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { BookClubMember } from '@models/club.type'
import { showClubDetailsAtom } from '@stores/clubs.state'
import { userAtom } from '@stores/user.state'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@utils/supabase'
import tw from '@utils/tailwind'
import { Image } from 'expo-image'
import { useAtom } from 'jotai'
import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View, useColorScheme } from 'react-native'

interface BookClubProps {
  item: BookClubMember
}

const BookClubCard: React.FC<BookClubProps> = ({ item }) => {
  const [user] = useAtom(userAtom)
  const theme = useColorScheme()
  const queryClient = useQueryClient()
  const currentRead = item.book_clubs.book_club_reads?.[0]?.books
  const [, setShowClubDetailsModal] = useAtom(showClubDetailsAtom)

  const acceptInviteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('book_club_members')
        .update({ status: 'ACCEPTED' })
        .eq('book_club_id', item.book_club_id)
        .eq('user_id', user?.id)

      if (error) throw new Error(error.message)
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: [QueryKeys.myClubs] })
      }, 1000)
    }
  })

  const handleAcceptInvite = () => {
    acceptInviteMutation.mutate()
  }

  const handleDeclineInvite = () => {
    // You can implement this with a similar mutation to set status to 'DECLINED'
  }

  return (
    <View
      style={tw`${theme === 'light' ? 'bg-white' : 'bg-black'} rounded-xl p-4 mb-4 shadow-md`}
    >
      {/* Header */}
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <QuickSandTextRegular style={tw`text-xl font-semibold text-accent`}>
          {item.book_clubs.club_name}
        </QuickSandTextRegular>
      </View>

      {/* Book Content */}
      <TouchableOpacity
        onPress={() => setShowClubDetailsModal(item.book_club_id)}
        activeOpacity={0.9}
      >
        {currentRead ? (
          <View style={tw`flex-row items-start`}>
            <Image
              source={{ uri: currentRead.cover_image_url }}
              style={tw`w-20 h-28 rounded-md mr-4`}
            />
            <View style={tw`flex-1`}>
              <Text
                style={tw`text-base font-bold ${theme === 'light' ? 'text-black/90' : 'text-white/90'}`}
              >
                {currentRead.title}
              </Text>
              <Text
                style={tw`text-xs mt-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}
                numberOfLines={4}
              >
                {currentRead.description}
              </Text>
            </View>
          </View>
        ) : (
          <View style={tw`bg-gray-100 dark:bg-neutral-800 p-4 rounded mt-2`}>
            <Text style={tw`text-sm text-gray-600 dark:text-gray-300 italic`}>
              No book has been selected as the current read.
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Invite Actions */}
      {item.status === 'INVITED' && (
        <View style={tw`mt-4 flex-row justify-evenly`}>
          <TouchableOpacity
            hitSlop={hitSlop}
            onPress={handleDeclineInvite}
            style={tw`p-2 rounded-full`}
          >
            <MaterialIcons name="cancel" style={tw`text-red-500 font-medium text-4xl`} />
          </TouchableOpacity>

          <TouchableOpacity
            hitSlop={hitSlop}
            onPress={handleAcceptInvite}
            style={tw`p-2 rounded-full`}
            disabled={acceptInviteMutation.isPending}
          >
            {acceptInviteMutation.isPending ? (
              <ActivityIndicator />
            ) : (
                <MaterialIcons name="add-circle" style={tw`text-accent font-medium text-4xl`} />
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default BookClubCard