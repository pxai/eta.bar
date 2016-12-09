import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from './comment.service';


@Component({
  selector: 'auth',
  templateUrl: './comment.component.html'
})
export class CommentComponent {
   text: String = '';
   localState: any;

  constructor(public route: ActivatedRoute, private commentService: CommentService) {
  }

  submitComment() {
    console.log(this.text);
  }



}
