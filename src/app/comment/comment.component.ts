import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from './comment.service';
import { StoreHelper } from '../store-helper';
import { Store } from '../app.store';

@Component({
  selector: 'comments',
  templateUrl: './comment.component.html'
})
export class CommentComponent {

  comment: {id:1,text: ''};
  text: string = '';
   localState: any;
   session: any;
   comments  = [];
  toggleComment: boolean = true;
  lastDate : string;
  firstDate: string;

  constructor(public route: ActivatedRoute,
              public store: Store,
              public storeHelper: StoreHelper,
              private commentService: CommentService) {

    this.session = storeHelper.store.getState().session;
   /* this.commentService.getLatest().subscribe(data => {
      console.log('Ok, comments received:  ' + data.length);
      this.comments = data;
    });*/
    // subscribe to the store, so other operations just need to subscribe
    this.storeHelper.store.changes //.pluck('question')
    //.map((data: any) => data)
      .subscribe((data: any) =>  {
        // console.log('Comment component: ' + data.question._id);
        console.log('CC> Lets see: ');console.log(data);
        this.comments = data.comments;
        if (this.comments.length > 0) {
          this.firstDate = data.comments[0].createdAt;
          this.lastDate = data.comments[(data.comments.length - 1)].createdAt;
        }
      });
    console.log('CC> Ok, comments: ');
    console.log(this.session);

  }

  submitComment() {
    this.toggleComment = false;
    let id = this.storeHelper.store.getState().question._id;
    console.log(this.text + ' in ' + id);
    this.commentService.createComment(id, this.text).subscribe(data => {
      console.log('Ok, comment sent and received. Clear.' );
      console.log(data);
      this.text = '';
    });
  }



}
