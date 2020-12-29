import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionComponent } from './question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Question } from 'src/app/shared/models/questions.interface';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  const testQuestion: Question = {
    title: 'Test question',
    answers: [
      {
        title: 'Test answer',
        value: 1,
        id: 1
      },
      {
        title: 'Another test answer',
        value: -2,
        id: 2
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [QuestionComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    component.question = testQuestion;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#continue', () => {
    it('should emit value', () => {
      spyOn(component.answerQuestion, 'emit');
      component.questionForm.controls.answerRadio.setValue(1);
      fixture.detectChanges();
      expect(component.questionForm.controls.answerRadio.value).toBe(1);
      component.continue();
      expect(component.answerQuestion.emit).toHaveBeenCalledOnceWith(1);
      expect(component.questionForm.controls.answerRadio.value).toBe(null);
    });
  });
});
