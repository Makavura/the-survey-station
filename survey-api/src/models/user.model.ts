import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IUser {    
    _id?: string;
    email: string;
    password: string;
    name?: string;
}

@Schema()
export class User extends Document {
    @Prop({unique: true})
    email: string;

    @Prop()
    password: string;

    @Prop()
    name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);