import { Book } from "@models/book.type";
import { atom } from "jotai";

const booksAtom = atom<Book[] | null>(null)

export {
  booksAtom
}