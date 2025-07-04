import React from 'react'
import { Text, TextProps } from './Themed'

export function SpaceMonoTextRegular(props: TextProps) {
	return <Text {...props} style={[props.style, { fontFamily: 'SpaceMonoRegular' }]} />
}

export function SpaceMonoTextBold(props: TextProps) {
	return <Text {...props} style={[props.style, { fontFamily: 'SpaceMonoBold' }]} />
}

export function SpaceMonoTextBoldItalic(props: TextProps) {
	return <Text {...props} style={[props.style, { fontFamily: 'SpaceMonoBoldItalic' }]} />
}

export function SpaceMonoTextItalic(props: TextProps) {
	return <Text {...props} style={[props.style, { fontFamily: 'SpaceMonoItalic' }]} />
}

export function QuickSandTextRegular(props: TextProps) {
	return <Text {...props} style={[props.style, { fontFamily: 'QuickSandRegular' }]} />
}

export function QuickSandTextLight(props: TextProps) {
	return <Text {...props} style={[props.style, { fontFamily: 'QuickSandLight' }]} />
}

export function QuickSandTextMedium(props: TextProps) {
	return <Text {...props} style={[props.style, { fontFamily: 'QuickSandMedium' }]} />
}

export function QuickSandTextBold(props: TextProps) {
	return <Text {...props} style={[props.style, { fontFamily: 'QuickSandBold' }]} />
}

export function QuickSandTextSemiBold(props: TextProps) {
	return <Text {...props} style={[props.style, { fontFamily: 'QuickSandSemiBold' }]} />
}
