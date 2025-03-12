import { Book } from "@models/book.type";
import { atom } from "jotai";

const bookAtom = atom<Book | null>(null)
const booksAtom = atom<Book[] | null>(null)

export {
  bookAtom,
  booksAtom
}