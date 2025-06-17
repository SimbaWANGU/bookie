import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image'
import { useQuery } from '@tanstack/react-query'
import tw from '@utils/tailwind'
import { QuickSandText } from '@components/styled/StyledText'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { supabase } from '@utils/supabase'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'
import { CreatorWithFollow } from '@models/follows/author.type'

interface AuthorProps {
  uri?: string
  name: string
  id: string // creator_id
}

const Author: React.FC<AuthorProps> = ({ uri, name, id }) => {
  const [user] = useAtom(userAtom)
  const [isFollowing, setFollowing] = useState(false)
  const { data: authorData, isLoading: authorDataLoading, error: authorDataError } = useQuery<CreatorWithFollow>({
    queryKey: ['author', id],
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
  
  // const followMutation = useMutation({
  //   mutationFn: async ({ creator_id, follow }: { creator_id: string; follow: boolean }) => {
  //     if (follow) {
  //       const { error } = await supabase.from('users_follow_creators').insert([{ creator_id }])
  //       if (error) throw error
  //     } else {
  //       const { error } = await supabase
  //         .from('users_follow_creators')
  //         .delete()
  //         .eq('creator_id', creator_id)
  //       if (error) throw error
  //     }
  //   },
  //   onMutate: async ({ follow }) => {
  //     setIsFollowing(follow) // Optimistically update
  //   },
  //   onError: (err) => {
  //     setIsFollowing((prev) => !prev) // Revert if failed
  //     console.error('Failed to update follow status:', err)
  //   },
  //   onSettled: () => {
  //     // refetch the list so everything stays in sync
  //     queryClient.invalidateQueries({ queryKey: [QueryKeys.authorsFollowed] })
  //   },
  // })

  // const handleFollowing = () => {
  //   followMutation.mutate({ creator_id: id, follow: !isFollowing })
  // }


  return (
    <View style={tw`flex flex-row gap-2 bg-transparent mb-4`}>
      <Image source={{ uri: authorData?.avatar_url }} style={tw`h-10 aspect-square rounded-full`} />

      <View style={tw`flex px-2 h-10 flex-col gap-1 bg-transparent`}>
        <QuickSandText style={tw`text-sm text-light`}>@{name}</QuickSandText>
        <View style={tw`bg-accent/40 px-2 rounded-lg absolute bottom-0`}>
          <QuickSandText style={tw`text-xs text-light`}>Author</QuickSandText>
        </View>
      </View>

      <TouchableOpacity
        style={tw`ml-2 items-center`}
        activeOpacity={0.5}
        // onPress={handleFollowing}
      >
        {isFollowing ? (
          <SimpleLineIcons name="user-following" style={tw`text-xl text-light`} color="black" />
        ) : (
          <SimpleLineIcons name="user-follow" style={tw`text-xl text-light`} color="black" />
        )}
      </TouchableOpacity>
    </View>
  )
}

export default Author