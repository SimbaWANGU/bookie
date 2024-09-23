import { createQueryKeyStore } from '@lukemorales/query-key-factory'
import { Pokemon } from '@models/pokemon.type'
import { pokemonApi } from './api.pokemon'
import { booksApi } from './books/api.books'
import { storiesApi } from './story/api.stories'

export const pokemonKeys = createQueryKeyStore({
  pokemon: {
    detail: (id: number) => ({
      queryKey: [id],
      queryFn: () => pokemonApi.getPokemon(id),
    }),
    list: (filters: Pokemon[], limit: number, offset: number) => ({
      queryKey: [{ filters, limit, offset }],
      queryFn: () => pokemonApi.getPokemonList({ limit, offset }),
    }),
  },
})

export const bookKeys = createQueryKeyStore({
  book: {
    list: () => ({
      queryKey: ['all-books'],
      queryFn: () => booksApi.getBooks(),
    })
  },
})

export const storyKeys = createQueryKeyStore({
  story: {
    instance: (id: string) => ({
      queryKey: ['story', id],
      queryFn: () => storiesApi.getStory(id),
    })
  },
})