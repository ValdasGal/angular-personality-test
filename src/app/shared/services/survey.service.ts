import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questions } from '../models/questions.interface';

@Injectable()
export class SurveyService {
  constructor(private http: HttpClient) {}

  getSurvey(): Observable<Questions> {
    return this.http.get<Questions>('./assets/data/survey.json');
  }
}
