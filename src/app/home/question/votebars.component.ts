import {Component, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from './comment.service';
import { StoreHelper } from '../store-helper';

//styles: [require('votebars.css')]

@Component({
  selector: 'votebars',
  templateUrl: './votebars.component.html',
  styleUrls: [ './votebars.css' ],
})
export class VotebarsComponent {
  @Input()
  totalPercentage: number[] = [45,10,25,10];
  @Input()
  totalVotes: string;
  @Input()
  questions: string[];
  colors: string[] = ['red','green','orange','blue','olive','teal'];

  constructor() {
  }



}
