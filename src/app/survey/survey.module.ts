import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey.component';
import { QuestionComponent } from './question/question.component';
import { HttpClientModule } from '@angular/common/http';
import { SurveyService } from '../shared/services/survey.service';

@NgModule({
  declarations: [SurveyComponent, QuestionComponent],
  imports: [CommonModule, SurveyRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [SurveyService]
})
export class SurveyModule {}
