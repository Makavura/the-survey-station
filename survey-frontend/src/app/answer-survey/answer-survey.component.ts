import { Component, OnInit } from '@angular/core';
import { SurveysService } from '../services/surveys.service';

@Component({
  selector: 'app-answer-survey',
  templateUrl: './answer-survey.component.html',
  styleUrls: ['./answer-survey.component.css']
})
export class AnswerSurveyComponent implements OnInit {
  surveys: any = [];
  constructor(
    private surveysService: SurveysService,
  ) { }

  ngOnInit(): void {
    this.loadSurveys()
  }

  loadSurveys() {
    return this.surveysService
      .fetchAllSurveys().subscribe((surveys) => {
        this.surveys = surveys;
        console.log(this.surveys)
        return this.surveys
      }, (err) => { console.warn(err) });
  }
}
