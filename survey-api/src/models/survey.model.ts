import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface ISurvey {
    _id?: string;
    title: string;
    questions: any[];
    responses: any[];
}

@Schema()
export class Survey extends Document {
    @Prop()
    title: string

    @Prop()
    questions: Array<any>

    @Prop()
    responses: Array<any>
}

export const SurveySchema = SchemaFactory.createForClass(Survey);