import { View, Text, Dimensions } from 'react-native'
import React, { useCallback } from 'react'
import { Story } from '@models/story.type'
import Carousel from 'react-native-reanimated-carousel'
import { getDynamicValue } from '@constants/Functions'
import Page from './Page'
import { interpolate } from 'react-native-reanimated'

type StoryCarouselProps = {
  story: Story
}

const PAGE_WIDTH = Dimensions.get('window').width

const StoryCarousel: React.FC<StoryCarouselProps> = ({ story }) => {
  const animationStyle = useCallback(
		(value: number) => {
			'worklet'
 
			const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30])
			const translateX = interpolate(
				value,
				[-2, 0, 1],
				[-PAGE_WIDTH, 0, PAGE_WIDTH],
			)
 
			return {
				transform: [{ translateX }],
				zIndex,
			}
		},
		[],
	)

  return (
    <Carousel
			loop={true}
			autoPlay={false}
			style={{
        marginBottom: getDynamicValue(10),
        borderRadius: getDynamicValue(20),
        height: '100%',
      }}
			width={PAGE_WIDTH}
			data={[...story.storyContent]}
			renderItem={({index, item }) => 
				<Page
					key={index}
					text={item}
					bookId={story.bookId as string}
				/>
			}
			customAnimation={animationStyle}
			scrollAnimationDuration={2500}
		/>
  )
}

export default StoryCarousel