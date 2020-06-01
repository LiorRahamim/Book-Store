import { Book } from "../models/book.model";

export class AddBook {
  static readonly type = '[BOOK] Add'

  constructor(public payload: Book) {
  }
}

export class RemoveBook {
  static readonly type = '[BOOK] Remove'

  constructor(public payload: number) {
  }
}

export class UpdateBook {
  static readonly type = '[BOOK] Update'

  constructor(public payload: Book) {
  }
}
