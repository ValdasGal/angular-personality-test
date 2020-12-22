import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/shared/models/questions.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question!: Question;
  @Input() continueButtonText: string = 'Next';
  @Output() answerQuestion: EventEmitter<number> = new EventEmitter();

  questionForm: FormGroup = new FormGroup({
    answerRadio: new FormControl('', [Validators.required])
  });

  constructor() {}

  ngOnInit() {}

  continue() {
    if (this.questionForm.valid) {
      this.questionForm.controls.answerRadio.setValue(null);

      this.answerQuestion.emit(this.questionForm.controls.answerRadio.value);
    }
  }

  // Track by index to improve performance.
  trackByAnswerIndex(index: number): number {
    return index;
  }
}
