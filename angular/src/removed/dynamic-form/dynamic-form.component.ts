import {Component, Input, OnInit} from '@angular/core';
import {QuestionControlService} from '../services/local/question-control.service';
import {QuestionBase} from '../form/question-base';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  constructor(private qcs: QuestionControlService) {  }

  @Input() questions: QuestionBase<string>[] = [];
  form: FormGroup;
  payLoad = '';

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit(): void {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
