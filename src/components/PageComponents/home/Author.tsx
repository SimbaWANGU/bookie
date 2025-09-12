import { QuickSandTextBold, QuickSandTextRegular } from '@components/styled/StyledText'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { CreatorWithFollow } from '@models/follows/author.type'
import { userAtom } from '@stores/user.state'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@utils/supabase'
import tw from '@utils/tailwind'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { Pressable, TouchableOpacity, View } from 'react-native'

interface AuthorProps {
  uri: string
  name: string
  id: string // creator_id
}

const Author: React.FC<AuthorProps> = ({ uri, name, id }) => {
  const [user] = useAtom(userAtom)
  const [isFollowing, setFollowing] = useState(false)
  const { data: authorData, isLoading: authorDataLoading, error: authorDataError } = useQuery<CreatorWithFollow>({
    queryKey: ['author_follows', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_creator_with_follow', {
          _creator_id: id,
          _user_id: user?.id,
        })
        .single(); // .single() since it returns exactly one row

      if (error) throw error;
      return data as CreatorWithFollow; 
    }
  })

  useEffect(() => {
    if (authorData) {
      setFollowing(authorData.is_following)
    }
  }, [authorDataLoading])

  return (
    <Pressable
      style={tw`flex flex-row bg-transparent`}
      onPress={() => router.push(`/authorsprofile/${id}`)}
    >
      <Image source={{ uri }} style={tw`h-8 aspect-square rounded-full`} />

      <View style={tw`flex px-2 h-10 flex-col gap-1 bg-transparent`}>
        <QuickSandTextBold style={tw`text-xs text-light`}>@{name}</QuickSandTextBold>

        <View style={tw`bg-accent/40 px-2 rounded-full self-start`}>
          <QuickSandTextRegular style={tw`text-xs text-light`}>
            Author
          </QuickSandTextRegular>
        </View>
      </View>
    </Pressable>
  )
}

export default Author