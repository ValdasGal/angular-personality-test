import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyComponent } from './survey.component';
import { QuestionComponent } from './question/question.component';
import { SurveyService } from '../shared/services/survey.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Questions } from '../shared/models/questions.interface';

describe('SurveyComponent', () => {
  let component: SurveyComponent;
  let fixture: ComponentFixture<SurveyComponent>;
  let router: Router;
  let surveyService: SurveyService;
  const mockSurveyResponse: Questions = {
    questions: [
      {
        title: 'Test question',
        answers: [
          {
            value: -1,
            title: 'Test answer',
            id: 1
          }
        ]
      },
      {
        title: 'Another test question',
        answers: [
          {
            value: 1,
            title: 'Another test answer',
            id: 2
          }
        ]
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [SurveyComponent, QuestionComponent],
      providers: [SurveyService]
    }).compileComponents();
    surveyService = TestBed.inject(SurveyService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    spyOn(surveyService, 'getSurvey').and.returnValue(of(mockSurveyResponse));
    fixture = TestBed.createComponent(SurveyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    spyOn(component, 'getSurveyQuestions').and.callThrough();
    expect(component.currentQuestionIndex).toBe(0);
    expect(component.isLoadingSurvey).toBe(false);
    expect(component.questions).toEqual([]);
    expect(component.surveyValue).toBe(0);
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.getSurveyQuestions).toHaveBeenCalled();
  });

  it('should get survey data', () => {
    fixture.detectChanges();
    expect(component.isLoadingSurvey).toBe(false);
    expect(component.questions).toEqual(jasmine.objectContaining(mockSurveyResponse.questions));
  });

  describe('#isLastQuestion', () => {
    it('should return false if it is not last question', () => {
      fixture.detectChanges();
      expect(component.isLastQuestion).toBe(false);
    });

    it('should return true if it is last question', () => {
      fixture.detectChanges();
      component.currentQuestionIndex = 1;
      expect(component.isLastQuestion).toBe(true);
    });
  });

  describe('#answerQuestion', () => {
    it('should calculate survey value and proceed to next question', () => {
      spyOn(component, 'nextQuestion');
      fixture.detectChanges();
      component.answerQuestion(-1);
      expect(component.surveyValue).toBe(-1);
      expect(component.nextQuestion).toHaveBeenCalled();
    });

    it('should navigate to complete page if all questions are answered', () => {
      spyOn(component, 'navigateToCompletePage');
      fixture.detectChanges();
      component.answerQuestion(-1);
      component.answerQuestion(2);
      expect(component.surveyValue).toBe(1);
      expect(component.navigateToCompletePage).toHaveBeenCalled();
    });
  });

  describe('#nextQuestion', () => {
    it('should update question index', () => {
      fixture.detectChanges();
      component.nextQuestion();
      expect(component.currentQuestionIndex).toBe(1);
    });
  });

  describe('#navigateToCompletePage', () => {
    it('should navigate to introvert complete page', () => {
      spyOn(router, 'navigateByUrl');
      fixture.detectChanges();
      component.navigateToCompletePage();
      expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/complete/introvert');
    });

    it('should navigate to extrovert complete page', () => {
      spyOn(router, 'navigateByUrl');
      fixture.detectChanges();
      component.surveyValue = -1;
      component.navigateToCompletePage();
      expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/complete/extravert');
    });
  });
});
