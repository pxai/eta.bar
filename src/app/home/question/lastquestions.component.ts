import {Component, Input} from '@angular/core';
import { QuestionService } from './question.service';


@Component({
  selector: 'last-questions',
  templateUrl: './lastquestions.component.html'
})
export class LastQuestionsComponent {
  @Input()
  skip: number = 0;

  questions = [];

  constructor(private questionService: QuestionService) {

    this.questionService.getLatestQuestions(this.skip).subscribe(data => {
      console.log('Ok, latest questions received.' );
      console.log(data);
      this.questions = data;
    });
  }

}
