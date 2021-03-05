import { Component} from '@angular/core';
import {QuestionBase} from '../form/question-base';
import {Observable} from 'rxjs';
import {QuestionService} from '../services/local/question.service';

@Component({
  selector: 'app-bio-div',
  templateUrl: './bio-div.component.html',
  styleUrls: ['./bio-div.component.css'],
  providers: [ QuestionService ]
})
export class BioDivComponent{
  questions$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }

}
