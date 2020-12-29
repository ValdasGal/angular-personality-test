import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompleteComponent } from './complete.component';
import { ActivatedRoute } from '@angular/router';

describe('CompleteComponent', () => {
  let component: CompleteComponent;
  let fixture: ComponentFixture<CompleteComponent>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteComponent],
      providers: [
        {
          provide: ActivatedRoute,
          // On a larger project we would probably need to stub whole ActivatedRoute, but since we are using only
          // activatedRoute.snapshot.params use useValue instead.
          useValue: {
            snapshot: {
              params: { personality: 'introvert' }
            }
          }
        }
      ]
    }).compileComponents();

    route = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.personalityType).toBe('introvert');
  });
});
