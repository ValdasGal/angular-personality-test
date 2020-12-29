import { TestBed } from '@angular/core/testing';
import { SurveyService } from './survey.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SurveyService', () => {
  let service: SurveyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SurveyService]
    });
    service = TestBed.inject(SurveyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get survey data', () => {
    const mockSurveyResponse = {
      questions: [
        {
          title: 'Test question title'
        }
      ]
    };
    service.getSurvey().subscribe((resp) => {
      expect(resp.questions[0].title).toEqual('Test question title');
    });
    const request = httpTestingController.expectOne('./assets/data/survey.json');
    expect(request.request.method).toEqual('GET');
    request.flush(mockSurveyResponse);
  });
});
