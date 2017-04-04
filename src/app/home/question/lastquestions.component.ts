import {Component, Input} from '@angular/core';
import { QuestionService } from './question.service';


@Component({
  selector: 'last-questions',
  templateUrl: './lastquestions.component.html'
})
export class LastQuestionsComponent {
  @Input()
  skip: number = 0;
  @Input()
  lang: string;

  questions = [];

  constructor(private questionService: QuestionService) {
  }
  ngOnInit() {
    this.questionService.getLatestQuestions(this.skip, this.lang).subscribe(data => {
      console.log('Ok, latest questions received.' );
      console.log(data);

      this.questions = data;

      for (let i in data) {
        for (let j in data[i].question) {
          if (data[i].question[j].lang == this.lang) {
            this.questions[i].question = data[i].question[j].question;
            break;
          }
        }
      }


    });
  }

}
