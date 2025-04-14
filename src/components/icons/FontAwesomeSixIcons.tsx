import { StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import { getDynamicValue } from '@constants/Functions'

function FontAwesomeSixIcons(props: {
  name: React.ComponentProps<typeof FontAwesome6>['name'];
  color: string;
  className?: string
  style?: StyleProp<ViewStyle>;
}) {
	return <FontAwesome6 size={getDynamicValue(30)} style={props.style} {...props} />
}

export default FontAwesomeSixIcons