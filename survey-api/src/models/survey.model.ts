import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface ISurvey {
    _id?: string;
    title: string;
}

@Schema()
export class Survey extends Document {
    @Prop()
    title: string
}

export const SurveySchema = SchemaFactory.createForClass(Survey);