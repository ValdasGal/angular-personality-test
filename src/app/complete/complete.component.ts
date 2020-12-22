import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalityType } from '../shared/models/personalityType.interface';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  personalityType: PersonalityType = PersonalityType.introvert;

  ngOnInit(): void {
    this.personalityType = this.activatedRoute.snapshot.params.personality;
  }
}
