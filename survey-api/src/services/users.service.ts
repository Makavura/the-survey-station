import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, IUser } from 'src/models/user.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private UserModel: Model<IUser>) { }

    async createUser(user: IUser) {
        let response;
        let passwordHash = await bcrypt.hash(user.password, 8)
        user.password = passwordHash;
        const newUserInstance = new this.UserModel(user);
        await newUserInstance.save()
            .then(
                (doc) => {
                    response = doc[0]
                    return response;
                }
            )
            .catch(
                (error) => {
                    response = error;
                    return response;
                }
            )
        return response;
    }

    async fetchUserByEmail(email: string) {
        let response;
        await this.UserModel.find({ email: email })
            .then(
                (doc) => {
                    response = doc[0]
                    return response;
                }
            )
            .catch(
                (error) => {
                    response = error;
                    return response;
                }
            )
        return response;
    }

    async validatePassword(credentials: IUser) {
        let user;
        await this.UserModel.find({ email: credentials["email"] }).then(
            (doc) => {
                user = doc[0]
                return user;
            }
        )
            .catch(
                (error) => {
                    console.warn(error)
                }
            );
        return await bcrypt.compare(credentials["password"], user["password"]);
    }

}

