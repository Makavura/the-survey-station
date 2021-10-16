import { Controller,  Post, Body, Res, Param, Headers, Get, UseGuards } from '@nestjs/common';
import { ISurvey } from 'src/models/survey.model';
import { Response } from 'express';
import { SurveysService } from 'src/services/surveys.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/v1/surveys')
export class SurveysController {

    constructor(private surveysService: SurveysService){}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createSurvey(@Res() response: Response, @Body() survey: ISurvey){
        return await this.surveysService.createSurvey(survey)
    }

    @Get('')
    async fetchAllSurveys(@Res() response: Response){
        return await this.surveysService.fetchAllSurveys()
    }

    @Get(':id')
    async fetchSurvey(@Param() id: string){
        return await this.surveysService.fetchSurveyById(id)
    }

    @Post('response')
    async respondToSurvey(@Body() surveyResponse: ISurvey) {
        return await this.surveysService.answerSurvey(surveyResponse)
    }

}
