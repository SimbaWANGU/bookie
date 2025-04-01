import React, { useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { View } from '@components/styled/Themed';
import { QuickSandText } from '@components/styled/StyledText';
import { convertToTime } from '@constants/Functions';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from '@utils/tailwind';
import { BarChart } from 'react-native-gifted-charts';

const ReadingTime = () => {
  const [expanded, setExpanded] = useState(false);

  // Total reading time in seconds.
  const totalReadingTimeInSeconds = 2000;

  // Sample weekly data (reading time in minutes for each day of the week).
  const weeklyData = [
    { value: 30, label: 'Sun' },
    { value: 45, label: 'Mon' },
    { value: 20, label: 'Tue' },
    { value: 60, label: 'Wed' },
    { value: 90, label: 'Thu' },
    { value: 50, label: 'Fri' },
    { value: 80, label: 'Sat' },
  ];

  // Toggle the expanded state to show/hide the graph.
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <TouchableOpacity onPress={toggleExpanded} activeOpacity={0.8}>
      <View style={tw`my-4 rounded-lg shadow-lg overflow-hidden w-full`}>
        <LinearGradient
          colors={['#198D9E55', '#198D9Eaa']}
          style={tw`p-4`}
        >
          <View style={tw`flex-row items-center justify-between bg-transparent`}>
            <QuickSandText style={tw`text-xl font-bold text-white`}>
              Total Reading Time
            </QuickSandText>
            <Ionicons
              name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
              size={24}
              color="white"
            />
          </View>
          <View style={tw`mt-8 bg-transparent`}>
            <QuickSandText
              style={tw`text-4xl font-extrabold text-white`}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.5}
            >
              {convertToTime(totalReadingTimeInSeconds)}
            </QuickSandText>
          </View>
        </LinearGradient>
        {expanded && (
          <View style={tw`bg-white p-4`}>
            <BarChart
              data={weeklyData}
              height={220}
              barWidth={20}
              spacing={16}
              yAxisLabelSuffix={`'`}
              noOfSections={5}
							barBorderTopLeftRadius={10}
							barBorderTopRightRadius={10}
              frontColor="#198D9Ebb"
              // Adjusting axis label styles to ensure there's no extra left margin.
              yAxisTextStyle={{
                marginLeft: 0,
                color: '#000',
                fontSize: 12,
              }}
              xAxisLabelTextStyle={{
                marginLeft: 0,
                color: '#000',
                fontSize: 12,
              }}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ReadingTime;