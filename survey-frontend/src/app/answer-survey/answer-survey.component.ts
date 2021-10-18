import { Component, OnInit } from '@angular/core';
import { SurveysService } from '../services/surveys.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
@Component({
  selector: 'app-answer-survey',
  templateUrl: './answer-survey.component.html',
  styleUrls: ['./answer-survey.component.css']
})
export class AnswerSurveyComponent implements OnInit {
  surveys: any = [];
  activeSurveyId!: any;
  activeSurvey!: any;
  respondingToSurvey!: boolean;
  form = new FormGroup({});
  model!: any;
  fields: FormlyFieldConfig[] = [ ];

  constructor(
    private surveysService: SurveysService,
    private fb: FormBuilder,
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

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

  respondToSurvey(surveyId: any) {
    this.activeSurveyId = surveyId;
    this.surveys.forEach((survey: any) => {
      if (survey["_id"] == surveyId) {
        this.activeSurvey = survey
        this.fields = this.activeSurvey["questions"]
        this.respondingToSurvey = true;
        this.activeSurvey && this.respondingToSurvey;
      }
    });
  }

  backToSurveys(){
    this.respondingToSurvey = false;
    return this.respondingToSurvey;
  }

  onSubmitSurvey(){ 
    console.log(this.form.value)
    console.log(Object.keys(this.form.value))
    Object.keys(this.form.value).forEach((key) => {

    })
  }
}
