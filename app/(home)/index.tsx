import React, { useEffect } from 'react'
import { View } from '@components/styled/Themed'
import ShimmerPlaceholder from '@components/styled/Shimmer'
import { getDynamicValue, getRandomItems } from '@constants/Functions'
import TopCarousel from '@components/PageComponents/home/TopCarousel'
import BookContainer from '@components/styled/BookContainer'
import { ScrollView, useColorScheme, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import tw from 'twrnc'
import { Image } from 'expo-image'
import { supabase } from '@utils/supabase'

const { width } = Dimensions.get('window');

const index = () => {
	const theme = useColorScheme()
	// const { data, isLoading, isError: error } = useBooks()
  // useEffect(() => {
  //   const { data, error } = supabase.from('books').select('*')

  //   console.log(data, error)
  // }, [])

	const categories = ['Trending', 'Staff Picks', 'Top Rated', 'New Arrivals'];
  const genres = ['Sci-Fi', 'Romance', 'Mystery', 'Fantasy'];
  const friends = [
    { name: 'Anna', book: 'Dune', avatar: 'https://via.placeholder.com/40' },
    { name: 'Ben', book: '1984', avatar: 'https://via.placeholder.com/40' },
  ];
  const events = [
    { title: 'Author Talk: J.K. Rowling', date: 'Jan 20th' },
    { title: 'New Book Launch: Thrill Zone', date: 'Jan 25th' },
  ];
  const authors = [
    { name: 'Agatha Christie', bio: 'Queen of Mystery', books: ['Murder on the Orient Express'] },
  ];

  // console.log(data, isLoading, error)
  
	// if (isLoading) {
	// 	return (
	// 		<View style={tw`h-full w-full items-center justify-center`}>
	// 			<ShimmerPlaceholder
	// 				style={[tw`rounded w-11/12`, {
	// 					height: '40%',
	// 				}]}
	// 			/>
	// 			<View
	// 				style={tw`mt-4 w-11/12 flex flex-row flex-wrap items-center justify-around`}
	// 			>
	// 				{Array.from({ length: 4 }).map((_, index) => (
	// 					<ShimmerPlaceholder
	// 						key={index}
	// 						style={{
	// 							height: getDynamicValue(280),
	// 							width: '41%',
	// 							margin: 10,
	// 							borderRadius: 20,
	// 						}}
	// 					/>
	// 				))}
	// 			</View>
	// 		</View>
	// 	)
	// }

	// if (error) {
	// 	return (
	// 		<></>
	// 	)
	// }
	
	// const randomBooks = getRandomItems(books)
	// const booksOnDisplay = books.filter((book) => book.onDisplayPage)

	return (
		// <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 16 }}>
		// 	<TopCarousel books={randomBooks}/>
		// 	{/* Personalized Dashboard */}
    //   <View style={styles.dashboard}>
    //     <Text style={styles.sectionTitle}>Welcome Back, User!</Text>
    //     <Text style={styles.dashboardText}>
    //       Current Book: <Text style={styles.highlight}>Dune</Text>
    //     </Text>
    //     <Text style={styles.dashboardText}>
    //       Reading Streak: <Text style={styles.highlight}>5 Days</Text>
    //     </Text>
    //     <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
    //       <Text style={styles.link}>View Full Profile</Text>
    //     </TouchableOpacity>
    //   </View>

    //   {/* Categorized Sections */}
    //   <View style={styles.section}>
    //     <Text style={styles.sectionTitle}>Explore by Category</Text>
    //     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    //       {categories.map((category, index) => (
    //         <TouchableOpacity key={index} style={styles.categoryCard}>
    //           <Text style={styles.categoryText}>{category}</Text>
    //         </TouchableOpacity>
    //       ))}
    //     </ScrollView>
    //   </View>

    //   {/* Social Integrations */}
    //   <View style={styles.section}>
    //     <Text style={styles.sectionTitle}>What Your Friends Are Reading</Text>
    //     {friends.map((friend, index) => (
    //       <View key={index} style={styles.friendCard}>
    //         <Image source={{ uri: friend.avatar }} style={styles.avatar} />
    //         <Text style={styles.friendText}>
    //           {friend.name} is reading <Text style={styles.highlight}>{friend.book}</Text>
    //         </Text>
    //       </View>
    //     ))}
    //   </View>

    //   {/* Upcoming Events */}
    //   <View style={styles.section}>
    //     <Text style={styles.sectionTitle}>Mark Your Calendar</Text>
    //     {events.map((event, index) => (
    //       <View key={index} style={styles.eventCard}>
    //         <Text style={styles.eventTitle}>{event.title}</Text>
    //         <Text style={styles.eventDate}>{event.date}</Text>
    //       </View>
    //     ))}
    //   </View>

    //   {/* Genre Highlights */}
    //   <View style={styles.section}>
    //     <Text style={styles.sectionTitle}>Top Picks in Genres</Text>
    //     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    //       {genres.map((genre, index) => (
    //         <TouchableOpacity key={index} style={styles.genreCard}>
    //           <Text style={styles.genreText}>{genre}</Text>
    //         </TouchableOpacity>
    //       ))}
    //     </ScrollView>
    //   </View>

    //   {/* Featured Authors */}
    //   <View style={styles.section}>
    //     <Text style={styles.sectionTitle}>Spotlight: Authors</Text>
    //     {authors.map((author, index) => (
    //       <View key={index} style={styles.authorCard}>
    //         <Text style={styles.authorName}>{author.name}</Text>
    //         <Text style={styles.authorBio}>{author.bio}</Text>
    //       </View>
    //     ))}
    //   </View>
		// </ScrollView>
    <></>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#6200ee',
  },
  link: {
    color: '#6200ee',
    marginTop: 8,
    fontWeight: 'bold',
  },
  dashboard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dashboardText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555555',
  },
  carousel: {
    marginBottom: 16,
  },
  carouselItem: {
    width: width * 0.7,
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  carouselText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  categoryCard: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444444',
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  friendText: {
    fontSize: 14,
    color: '#555555',
  },
  eventCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  eventDate: {
    fontSize: 14,
    color: '#888888',
    marginTop: 4,
  },
  genreCard: {
    padding: 16,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    marginRight: 8,
  },
  genreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  authorCard: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  authorBio: {
    fontSize: 14,
    color: '#555555',
    marginTop: 4,
  },
});

export default index