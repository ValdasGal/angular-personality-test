import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalityType } from '../shared/models/personalityType.interface';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {
  personalityType: PersonalityType = PersonalityType.introvert;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.personalityType = this.activatedRoute.snapshot.params.personality;
  }
}
