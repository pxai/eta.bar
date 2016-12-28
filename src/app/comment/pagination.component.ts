import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from './comment.service';
import { StoreHelper } from '../store-helper';


@Component({
  selector: 'comments-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  pages : number = 3;
  comment: {id:1,text: ''};
  text: string = '';
   localState: any;
   session: any;
   comments  = [];
  toggleComment: boolean = true;

  constructor(public route: ActivatedRoute,
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
        console.log(data.question.comments);
      });
    console.log('Ok, comments: ');

  }

 /* submitComment() {
    this.toggleComment = false;
    let id = this.storeHelper.store.getState().question._id;
    console.log(this.text + ' in ' + id);
    this.commentService.createComment(id, this.text).subscribe(data => {
      console.log('Ok, comment sent and received');
      this.text = '';
    });
  }*/

   getNext (createdAt: string) {
    let id = this.storeHelper.store.getState().question._id;
    console.log('Checking for : ' + id + ' after: ' + createdAt);
     this.commentService.getLatest(id, createdAt).subscribe(data => {
       console.log('Ok, comment sent and received' + data);
       this.text = '';
     });
   }


}
