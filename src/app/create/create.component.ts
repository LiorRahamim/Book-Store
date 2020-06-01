import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddBook } from './../actions/book.actions'
import {ReadComponent} from "../read/read.component";
import {SharedService} from "../shared.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  static bookId: number = 0
  constructor(private store: Store, private sharedService:SharedService) { }

  addBook(name, category) {
    if(name.length > 0  && category.length > 0) {
      CreateComponent.bookId++
      this.store.dispatch(new AddBook({id: CreateComponent.bookId, name: name, category: category}))
      this.sharedService.sendClickEvent()
    }
  }


  ngOnInit(): void {
  }

}
