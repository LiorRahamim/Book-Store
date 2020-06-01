import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Book } from '../models/book.model'
import {AddBook, RemoveBook, UpdateBook} from './../actions/book.actions'

export class BookStateModel {
  books: Book[];
  categories: string[];
}

@State<BookStateModel>({
  name: 'books',
  defaults: {
    books: [],
    categories: [],
  }
})

export class BookState {

  @Selector()
  static getBooks(state: BookStateModel) {
    return state.books
  }


  @Selector()
  static getCategories(state: BookStateModel) {
    return state.categories
  }

  @Action(AddBook)
  add({getState, patchState}: StateContext<BookStateModel>, {payload}: AddBook) {
    const state = getState();
    patchState({
      books: [...state.books, payload],
      categories: Array.from(new Set([...state.books, payload].map(b => b.category)))
    })
  }

  @Action(RemoveBook)
  remove({getState, patchState}: StateContext<BookStateModel>, {payload}: RemoveBook) {
    patchState({
      books: getState().books.filter(b => b.id != payload),
      categories: Array.from(new Set(getState().books.filter(b => b.id != payload).map(b => b.category)))
    })
  }

  @Action(UpdateBook)
  update({getState, patchState}: StateContext<BookStateModel>, {payload}: UpdateBook) {
    patchState({
      books: [...getState().books.filter(b => b.id != payload.id), payload]
    })
  }

}
