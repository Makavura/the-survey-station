import { Component, OnInit } from '@angular/core';
import { ISurvey, SurveysService } from '../services/surveys.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  form: FormGroup;
  surveys = [];
  showCanvas!: boolean;

  constructor(
    private surveysService: SurveysService,
    private fb: FormBuilder,
  ) {  
    this.form = this.fb.group({
      title: [''],
    });
   }

  ngOnInit(): void { 
    this.showCanvas = false;
    this.loadSurveys();
  }

  createSurvey(survey: ISurvey){

  }

  loadSurveys(){
    this.surveysService.fetchAllSurveys().subscribe((response) => {
      console.log(response)     
    })
  }

  toggleCanvasDisplay(event: any){
    return this.showCanvas ? this.showCanvas = false : this.showCanvas = true
  }
}
