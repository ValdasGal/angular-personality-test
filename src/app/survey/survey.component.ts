import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService } from '../shared/services/survey.service';
import { Question } from '../shared/models/questions.interface';
import { PersonalityType } from '../shared/models/personalityType.interface';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  isLoadingSurvey = false;
  questions: Question[] = [];
  currentQuestionIndex = 0;
  // This value is used to calculate the result of the test - if it is negative it means that the user is extravert,
  // otherwise - introvert.
  // In "real world" this value should be calculated by backend.
  surveyValue = 0;

  constructor(private surveyService: SurveyService, private router: Router) {}

  get isLastQuestion(): boolean {
    return this.questions.length - 1 === this.currentQuestionIndex;
  }

  ngOnInit(): void {
    this.getSurveyQuestions();
  }

  getSurveyQuestions(): void {
    this.isLoadingSurvey = true;

    this.surveyService
      .getSurvey()
      .subscribe((resp) => {
        this.questions = resp.questions;
      })
      .add(() => {
        this.isLoadingSurvey = false;
      });
  }

  answerQuestion(event: number): void {
    this.surveyValue = this.surveyValue + event;

    if (!this.isLastQuestion) {
      this.nextQuestion();
    } else {
      this.navigateToCompletePage();
    }
  }

  nextQuestion(): void {
    this.currentQuestionIndex++;
  }

  navigateToCompletePage(): void {
    const personalityType = this.surveyValue < 0 ? PersonalityType.extravert : PersonalityType.introvert;
    this.router.navigateByUrl(`/complete/${personalityType}`);
  }
}
