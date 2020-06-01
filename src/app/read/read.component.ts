import {Component, OnInit, ViewChild} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Book } from './../models/book.model'
import {BookState, BookStateModel} from './../state/book.state' // We will use this shortly
import { Observable } from 'rxjs/Observable'
import {AddBook, RemoveBook} from './../actions/book.actions'
import {filter, take} from "rxjs/operators";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatSelectChange} from "@angular/material/select";
import {MatTable} from "@angular/material/table";
import {Subscription} from "rxjs";
import {SharedService} from "../shared.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  clickEventsubscription:Subscription;
  books$: Observable<Book[]>
  books: Book[]

  @ViewChild('booksTable') bookTable: MatTable<Book>

  categories$: Observable<string[]>
  chosenCategory = '';

  constructor(private store: Store, private sharedService:SharedService, public dialog: MatDialog) {
    this.books$ = this.store.select(state => state.books.books)
    this.categories$ = this.store.select(state => state.books.categories)
    this.categories$.subscribe(x => this.applyFilter())
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(() => {
      this.applyFilter()
    })
  }

  delBook(id) {
    this.store.dispatch((new RemoveBook(id)))
    this.applyFilter()
  }


  applyFilter() {
    this.books$.subscribe(res => this.books = res)
    this.books = this.books.filter(b => b.category == this.chosenCategory)
  }

  ngOnInit(): void {
  }

}
