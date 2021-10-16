import { Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Survey, ISurvey } from 'src/models/survey.model';

@Injectable()
export class SurveysService {
    constructor(@InjectModel(Survey.name) private SurveyModel: Model<Survey>) { }

    async createSurvey(survey: ISurvey) {
        const newSurveyInstance = new this.SurveyModel(survey);
        return newSurveyInstance.save((err, doc) => {
            if (err) {
                return {
                    message: 'Error Occured Creating Survey',
                    body: err,
                    status: HttpStatus.BAD_REQUEST
                }
            } else if (doc) {
                return {
                    message: 'Survey Created Successfully',
                    body: doc,
                    status: HttpStatus.CREATED
                }
            }
        });
    }

    async fetchAllSurveys() {
        return this.SurveyModel.find().exec((err, doc) => {
            if (err) {
                return {
                    message: 'Error Occured Fetching  Surveys',
                    body: err,
                    status: HttpStatus.BAD_REQUEST
                }
            } else if (doc) {
                return {
                    message: 'Surveys Fetched Successfully',
                    body: doc,
                    status: HttpStatus.OK
                }
            }
        })
    }

    async fetchSurveyById(surveyId: string) {
        return this.SurveyModel.findById(surveyId, (err, doc) => {
            if (err) {
                return {
                    message: 'Error Occured Fetching Survey',
                    body: err,
                    status: HttpStatus.BAD_REQUEST
                }
            } else if (doc) {
                return {
                    message: 'Survey Fetched Successfully',
                    body: doc,
                    status: HttpStatus.OK
                }
            }
        });
    }

    async answerSurvey(surveyAnswer: ISurvey) {
        /* find by id and update */
        const surveyId = surveyAnswer["_id"];
        delete surveyAnswer["_id"];
        return this.SurveyModel.findByIdAndUpdate(
            { surveyId },
            surveyAnswer,
            { upsert: false },
            (err, doc) => {
                if (err) {
                    return {
                        message: 'Error Occured Answering Survey',
                        body: err,
                        status: HttpStatus.BAD_REQUEST
                    }
                } else if (doc) {
                    return {
                        message: 'Survey Response Entry Saved Successfully',
                        body: doc,
                        status: HttpStatus.OK
                    }
                }
            });
    }
}
