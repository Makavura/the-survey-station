import { Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Survey, ISurvey } from 'src/models/survey.model';

@Injectable()
export class SurveysService {
    constructor(@InjectModel(Survey.name) private SurveyModel: Model<Survey>) { }

    async createSurvey(survey: ISurvey) {
        const newSurveyInstance = new this.SurveyModel(survey);
        return newSurveyInstance.save();
    }

    async fetchAllSurveys() {
        return await this.SurveyModel.find().exec()
    }

    async fetchSurveyById(surveyId: string) {
        return this.SurveyModel.findById(surveyId)
    }

    async answerSurvey(surveyAnswer: ISurvey) {
        const surveyId = surveyAnswer["_id"];
        delete surveyAnswer["_id"];
        return this.SurveyModel.findByIdAndUpdate({ surveyId }, surveyAnswer, { upsert: false })
    }
}
