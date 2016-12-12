import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from './comment.service';
import { StoreHelper } from '../store-helper';


@Component({
  selector: 'comments',
  templateUrl: './comment.component.html'
})
export class CommentComponent {
   text: String = '';
   localState: any;
   session: any;

  constructor(public route: ActivatedRoute,
              public storeHelper: StoreHelper,
              private commentService: CommentService) {

    this.session = storeHelper.store.getState().session;
    console.log('Ok, comments: ');
    console.log(this.session);
  }

  submitComment() {
    console.log(this.text);
  }



}
