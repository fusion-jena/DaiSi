import {Component, Input, OnInit} from '@angular/core';
import {QuestionBase} from '../form/question-base';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent implements OnInit {

  constructor() { }
  get isValid(): any { return this.form.controls[this.question.key].valid; }
  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;

  ngOnInit(): void {
  }
}
