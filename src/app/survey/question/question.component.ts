import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/shared/models/questions.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Input() question!: Question;
  @Input() continueButtonText = 'Next';
  @Output() answerQuestion: EventEmitter<number> = new EventEmitter();

  questionForm: FormGroup = new FormGroup({
    answerRadio: new FormControl('', [Validators.required])
  });

  constructor() {}

  continue(): void {
    if (this.questionForm.valid) {
      const answerObject = this.question.answers.find((answer) => {
        return answer.id === this.questionForm.controls.answerRadio.value;
      });
      // This should never happen, but If answer id is not find, do not change survey value.
      const answerValue = answerObject ? answerObject.value : 0;
      this.answerQuestion.emit(answerValue);

      this.questionForm.controls.answerRadio.setValue(null);
    }
  }

  // Track by index to improve performance.
  trackByAnswerIndex(index: number): number {
    return index;
  }
}
