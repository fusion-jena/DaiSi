import { Injectable } from '@angular/core';

import { DropdownQuestion } from '../../form/question-dropdown';
import { QuestionBase } from '../../form/question-base';
import { TextboxQuestion } from '../../form/question-textbox';
import { of } from 'rxjs';

@Injectable()
export class QuestionService {

  // TODO: get from a remote source of question metadata
  getQuestions(): any{

    const questions: QuestionBase<string>[] = [

      // new DropdownQuestion({
      //   key: 'brave',
      //   label: 'Bravery Rating',
      //   options: [
      //     {key: 'solid',  value: 'Solid'},
      //     {key: 'great',  value: 'Great'},
      //     {key: 'good',   value: 'Good'},
      //     {key: 'unproven', value: 'Unproven'}
      //   ],
      //   order: 3
      // }),

      new TextboxQuestion({
        key: 'Organism',
        label: 'Organism',
        order: 1
      }),

      new TextboxQuestion({
        key: 'Environment',
        label: 'Environment',
        order: 2
      }),
      new TextboxQuestion({
        key: 'Material',
        label: 'Material',
        order: 3
      }),
      new TextboxQuestion({
        key: 'Process',
        label: 'Process',
        order: 4
      }),
    new TextboxQuestion({
        key: 'Quality',
        label: 'Quality',
        order: 5
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
