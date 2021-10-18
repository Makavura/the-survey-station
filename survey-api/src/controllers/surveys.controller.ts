import { Controller, Post, Body, Res, Param, Get, UseGuards, Req, HttpStatus } from '@nestjs/common';
import { ISurvey } from 'src/models/survey.model';
import { Response } from 'express';
import { SurveysService } from 'src/services/surveys.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/v1/surveys')
export class SurveysController {

    constructor(private surveysService: SurveysService) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createSurvey(@Res() res: Response, @Body() survey: ISurvey) {
        await this.surveysService.createSurvey(survey)
        .then((doc) => {
            return res
                .json(doc)
                .status(HttpStatus.CONTINUE)
        }).catch((err) => {
            return res
                .json(err)
                .status(HttpStatus.NOT_FOUND)
        })
    }

    @Get('')
    async fetchAllSurveys(@Res() res: Response) {
        await this.surveysService.fetchAllSurveys().then((doc) => {
            return res
                .json(doc)
                .status(HttpStatus.CONTINUE)
        }).catch((err) => {
            return res
                .json(err)
                .status(HttpStatus.NOT_FOUND)
        })
    }

    @Get(':id')
    async fetchSurvey(@Param() params, @Res() res: Response) {
        await this.surveysService.fetchSurveyById(params?.id).then((doc) => {
            return res
                .json(doc)
                .status(HttpStatus.CONTINUE)
        }).catch((err) => {
            return res
                .json(err)
                .status(HttpStatus.NOT_FOUND)
        })
    }

    @Post('response')
    async respondToSurvey(@Body() surveyResponse: ISurvey) {
        return await this.surveysService.answerSurvey(surveyResponse)
    }

}
