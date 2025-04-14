import OnboardItem from '@components/PageComponents/onboard/OnboardItem'
import React, { useCallback, useRef } from 'react'
import { Dimensions } from 'react-native'
import { interpolate } from 'react-native-reanimated'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import OnboardImageOne from '@images/onboardone.png'
import OnboardImageTwo from '@images/onboardtwo.png'
import OnboardImageThree from '@images/onboardthree.png'
//import splash from '@images/splash.png'
import { getDynamicValue } from '@constants/Functions'
 
const PAGE_WIDTH = Dimensions.get('window').width

const Onboard = () => {
	const ref = useRef<ICarouselInstance>(null)
	const slideText = {
		slideOne: [OnboardImageOne, 'Hello, this is', 'Book Worms', 'Read books designed to entertain you...'],
		slideTwo: [OnboardImageTwo, 'What you can do at', 'Book Worms', 'Set your reading targets and track your progress...'],
		slideThree: [OnboardImageThree, 'Sign In', 'Book Worms', 'Start your journey here']
	}

	const animationStyle = useCallback(
		(value: number) => {
			'worklet'
 
			const zIndex = Math.round(interpolate(value, [-1, 0, 1], [10, 20, 30]))
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
			ref={ref}
			loop={true}
			autoPlay={true}
			autoPlayInterval={5000}
			style={{
				marginBottom: getDynamicValue(20),
				borderRadius: getDynamicValue(20),
				height: '100%'
			}}
			width={PAGE_WIDTH}
			data={[slideText.slideOne, slideText.slideTwo, slideText.slideThree]}
			renderItem={({index, item }) => 
				<OnboardItem
					key={index}
					text={item}
				/>
			}
			customAnimation={animationStyle}
			scrollAnimationDuration={2500}
		/>
	)
}

export default Onboard



 