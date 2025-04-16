import React from 'react'
import { ImageBackground } from 'react-native'
import { View } from '@components/styled/Themed'
import { dark, light } from '@constants/Color'
import { MonoText, QuickSandText } from '@components/styled/StyledText'
import tw from '@utils/tailwind'

interface storySwiperProps {
  text: string
  bookId: string
}

const Page: React.FC<storySwiperProps> = ({ text }): JSX.Element => {
	const regexImageLink = /^https:\/\/drive\.google\.com\/uc\?export=view&id=\S+$/
	// const regexTheEnd = /^The End$/i

	// const updateAchievementMutation = useMutation({
	// 	mutationFn: async ({ bookId, achievement }: { bookId: string, achievement?: string | null }) => {
	// 		let updateObject: { completed: string[]; achievements?: string[] } = {
	// 			// completed: user?.completed ? [...user.completed, bookId] : [bookId],
	// 			1
	// 		}
  
	// 		if (achievement) {
	// 			updateObject = {
	// 				...updateObject,
	// 				achievements: user?.achievements ? [...user.achievements, achievement] : [achievement],
	// 			}
	// 		}

	// 		const { data, error } = await supabase.from('profiles').update(updateObject).eq('id', user?.id).single()
	// 		if (error) {
	// 			return error
	// 		}
	// 		return data
	// 	},
	// 	onSuccess: () => {
	// 		if (achievement !== null && achievement !== undefined) {
	// 			Toast.show({
	// 				type: 'info',
	// 				text1: achievement.title,
	// 				text1Style: {
  //           fontSize: getDynamicValue(20),
  //           fontWeight: 'bold',
  //         },
	// 				text2: achievement.description,
	// 				text2Style: {
  //           fontSize: getDynamicValue(16),
  //         },
	// 			})
	// 			setAchievement(null)
	// 		}
	// 		queryClient.invalidateQueries({
	// 			queryKey: [`user-${user?.id}`]
	// 		})
	// 	},
	// 	onError: (_) => {
	// 		// Sentry.Native.captureMessage('Error updating user achievements')
	// 		// Sentry.Native.captureException(error)
	// 	}
	// })

	// useEffect(() => {
	// 	if (regexTheEnd.test(text as string)) {
	// 		if (!user?.completed?.includes(bookId as string) || achievement !== null) {
	// 			void updateAchievementMutation.mutate({ bookId: bookId as string, achievement: achievement?.title })
	// 		}
	// 	}
	// }, [text, achievement])

	return (
		<View
			style={tw`h-full w-full justify-center`}
			lightColor={light.background}
			darkColor={dark.background}
		>
			{(regexImageLink.test(text as string))
				? <ImageBackground
					source={{ uri: text as string }}
					style={tw`flex-1`}
				/>
				: (text.length < 50)
					? <QuickSandText
						style={tw`text-center text-4xl w-11/12 shadow`}
						lightColor={light.activeIconColor}
						darkColor={dark.activeIconColor}
					>{text}</QuickSandText>
					: <MonoText
						style={tw`text-center w-full p-2 text-2xl`}
						lightColor={light.text}
						darkColor={dark.text}
					>{text}</MonoText>
			}
		</View>
	)
}

export default Page
