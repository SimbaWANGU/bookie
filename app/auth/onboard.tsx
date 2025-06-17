import React, { useCallback, useMemo, useRef } from 'react'
import OnboardItem from '@components/PageComponents/onboard/OnboardItem'
import OnboardImageOne from '@images/onboardone.png'
import OnboardImageTwo from '@images/onboardtwo.png'
import OnboardImageThree from '@images/onboardthree.png'
import { Dimensions, Platform } from 'react-native'
import { getDynamicValue } from '@constants/Functions'
import { interpolate } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'

const Onboard = () => {
  // Define the slides as an array of arrays.
  const slides = [
    [OnboardImageOne, 'Hello, this is', 'Book Worms', 'Read or listen to books designed to entertain you'],
    [OnboardImageTwo, 'Hello, this is', 'Book Worms', 'Come and unlock your reading potential'],
    [OnboardImageThree, 'Hello, this is', 'Book Worms', 'Dive into your next great read']
  ]

  // On Android, render one random slide.
  if (Platform.OS === 'android') {
    const randomSlide = useMemo(() => {
      const index = Math.floor(Math.random() * slides.length)
      return slides[index]
    }, [slides])
  
    return <OnboardItem key={`slide-${randomSlide[1]}`} text={randomSlide} />
  }

  // On iOS, use a carousel to show all slides.
  const PAGE_WIDTH = Dimensions.get('window').width
  const carouselRef = useRef(null)

  const animationStyle = useCallback(
    (value: number) => {
      'worklet'
      const zIndex = Math.round(interpolate(value, [-1, 0, 1], [10, 20, 30]))
      const translateX = interpolate(
        value,
        [-2, 0, 1],
        [-PAGE_WIDTH, 0, PAGE_WIDTH]
      )
      return {
        transform: [{ translateX }],
        zIndex,
      }
    },
    [PAGE_WIDTH]
  )
     
  return (
    <Carousel
      ref={carouselRef}
      loop={true}
      autoPlay={true}
      autoPlayInterval={5000}
      style={{
        marginBottom: getDynamicValue(20),
        borderRadius: getDynamicValue(20),
        height: '100%',
      }}
      width={PAGE_WIDTH}
      data={slides}
      renderItem={({ index, item }) => (
        <OnboardItem key={`slide-${index}`} text={item} />
      )}
      customAnimation={animationStyle}
      scrollAnimationDuration={2500}
    />
  )
}

export default Onboard