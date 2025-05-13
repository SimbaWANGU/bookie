import {
  ActivityIndicator,
  View,
  useColorScheme,
} from 'react-native'
import React from 'react'
import { dark, light } from '@constants/Color'
import SearchBox from '@components/PageComponents/search/SearchBox'
import { useAtom } from 'jotai'
import { searchOptionsAtom, searchTermAtom } from '@stores/search.state'
import { useInfiniteQuery } from '@tanstack/react-query'
import SearchOptions from '@components/PageComponents/search/SearchOptions'
import { searchApi } from '@api/search/api.search'
import { PAGE_SIZE } from '@constants/Variables'
import { CustomUser } from '@models/userProfile.type'
import { Book } from '@models/book.type'
import { Author } from '@models/author.type'
import { Paragraph } from '@models/paragraph.type'
import AuthorsSearchResults from '@components/PageComponents/search/AuthorsSearchResults'
import BooksSearchResults from '@components/PageComponents/search/BooksSearchResults'
import PagesSearchResults from '@components/PageComponents/search/PagesSearchResults'
import UsersSearchResults from '@components/PageComponents/search/UsersSearchResults'
import tw from '@utils/tailwind'
import ExploreResults from '@components/PageComponents/search/ExploreResults'

type SearchOption = 'users' | 'authors' | 'books' | 'pages'

type SearchResultTypeMap = {
  users: CustomUser
  authors: Author
  books: Book
  pages: Paragraph
}

const Search = () => {
  const theme = useColorScheme()

  const [searchTerm] = useAtom(searchTermAtom)
  const [searchOption] = useAtom(searchOptionsAtom)


  const { data: searchResults, isFetching, hasNextPage, fetchNextPage, isLoading, error } = useInfiniteQuery<SearchResultTypeMap[typeof searchOption][]>({
    queryKey: ['search', searchOption, searchTerm],
    enabled: searchTerm.length > 2 && !!searchOption,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => lastPage.length === PAGE_SIZE ? allPages.length : undefined,
    queryFn: async ({ pageParam }) => await searchApi({ pageParam: pageParam as number, searchOption, searchTerm }),
  })

  const flatResults = searchResults?.pages.flatMap((page) => page) ?? []

  const renderResults = () => {
    switch (searchOption) {
      case 'users':
        return <UsersSearchResults item={flatResults as CustomUser[]} />
      case 'authors':
        return <AuthorsSearchResults item={flatResults as Author[]} />
      case 'books':
        return <BooksSearchResults item={flatResults as Book[]} />
      case 'pages':
        return <PagesSearchResults item={flatResults as Paragraph[]} />
      default:
        return null
    }
  }

  return (
    <View style={tw`flex-1 ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
      <SearchBox />
      <SearchOptions />
      {/* {isLoading || isFetching ? (
        <ActivityIndicator />
      ) : flatResults.length === 0 ? (
        <></>
      ) : (
        renderResults()
      )} */}
			<ExploreResults />
    </View>
  )
}

export default Search