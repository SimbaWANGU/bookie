import { View, Text, Modal, Pressable, ActivityIndicator, Image, ScrollView } from 'react-native'
import React from 'react'
import tw from '@utils/tailwind'
import { useAtom } from 'jotai'
import { showClubDetailsAtom } from '@stores/clubs.state'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@constants/QueryKeys'
import { getClubDetails } from '@api/clubs/api.clubs'

const ClubDetailsModal = () => {
  const [showClubDetailsModal, setShowClubDetailsModal] = useAtom(showClubDetailsAtom)

  const { data: clubDetails, isLoading } = useQuery<BookClub[]>({
    enabled: showClubDetailsModal.length > 1,
    queryKey: [QueryKeys.clubDetails, showClubDetailsModal],
    queryFn: async () => await getClubDetails(showClubDetailsModal)
  })

  if (!showClubDetailsModal) return null

  const club = clubDetails?.[0]
  const read = club?.book_club_reads?.[0]
  const book = read?.books
  const totalPages = book?.story_paragraphs_count?.[0]?.count ?? 1
  const members = book?.user_reading_progress || []

  return (
    <Modal visible={!!showClubDetailsModal} animationType="slide" transparent>
      <View style={tw`flex-1 justify-end bg-black/40`}>
        <View style={tw`bg-white rounded-t-3xl p-5 android:h-11/12 ios:h-9/10 w-full`}>
          

          {/* Loading */}
          {isLoading ? (
            <ActivityIndicator style={tw`flex-1 justify-center`} size="large" />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`pb-12`}
            >
              {/* Club Info */}
              <Text style={tw`text-xl font-bold mb-1 text-center`}>
                {club?.club_name}
              </Text>
              {/* <Text style={tw`text-sm text-gray-500 text-center mb-4`}>
                Visibility: {club?.visibility?.toUpperCase() || 'Private'} | Due: Jan 1, 2025
              </Text> */}

              {/* Book Summary */}
              {book && (
                <View style={tw`flex-row bg-gray-50 p-3 rounded-xl shadow-sm mb-6`}>
                  <Image
                    source={{ uri: book.cover_image_url }}
                    style={tw`w-20 h-28 rounded-md`}
                    resizeMode="cover"
                  />
                  <View style={tw`ml-4 flex-1`}>
                    <Text style={tw`text-base font-semibold mb-1`}>
                      {book.title}
                    </Text>
                    <Text style={tw`text-sm text-gray-600`} numberOfLines={4}>
                      {book.description}
                    </Text>
                  </View>
                </View>
              )}

              {/* Member Progress */}
              <Text style={tw`text-base font-semibold mb-3`}>Member Progress</Text>
              {members.length === 0 ? (
                <Text style={tw`text-center text-gray-400 mb-6`}>
                  No members have started reading yet.
                </Text>
              ) : (
                members.map((entry: UserReadingProgress) => {
                  const { users, current_paragraph, status } = entry
                  const percent = totalPages > 0
                    ? Math.round((current_paragraph / totalPages) * 100)
                    : 0

                  return (
                    <View
                      key={users.id}
                      style={tw`flex-row items-center bg-gray-100 rounded-lg p-3 mb-3`}
                    >
                      <Image
                        source={{ uri: users.avatar_url }}
                        style={tw`w-10 h-10 rounded-full`}
                      />
                      <View style={tw`ml-3 flex-1`}>
                        <Text style={tw`font-medium`}>
                          {users.name} <Text style={tw`text-gray-500`}>@{users.user_name}</Text>
                        </Text>
                        <Text style={tw`text-sm text-gray-500`}>Status: {status}</Text>

                        {/* Progress Bar */}
                        <View style={tw`h-2 bg-gray-300 rounded-full mt-1`}>
                          <View
                            style={tw.style(`h-full bg-blue-500 rounded-full`, {
                              width: `${percent}%`,
                            })}
                          />
                        </View>
                      </View>
                      <Text style={tw`ml-2 font-semibold text-sm`}>{percent}%</Text>
                    </View>
                  )
                })
              )}
            </ScrollView>
          )}

          {/* Close Button */}
          <Pressable onPress={() => setShowClubDetailsModal('')} style={tw`mt-4`}>
            <Text style={tw`text-center text-blue-500 font-medium text-base`}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

export default ClubDetailsModal

interface User {
  id: string
  name: string
  user_name: string
  avatar_url: string
  expo_push_token?: string | null
}

interface UserReadingProgress {
  total_time_spent: number
  current_paragraph: number
  paragraph_id: string
  status: string
  users: User
}

interface Book {
  id: string
  title: string
  cover_image_url: string
  description: string
  story_paragraphs_count: { count: number }[]
  user_reading_progress: UserReadingProgress[]
}

interface BookClubRead {
  completed_by: string
  books: Book
}

interface BookClub {
  club_name: string
  visibility: string
  book_club_reads: BookClubRead[]
}