import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { IUser } from 'src/models/user.model';
import { UsersService } from 'src/services/users.service';

@Controller('/api/v1/users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post('')
    async createUser(@Body() credentials: IUser, @Res() response: Response) {
        await this.usersService.createUser(credentials).
        then(() => {
            response
            .status(HttpStatus.CONTINUE)
            .send()
        }).
        catch((e) => {
            console.log(e["keyPattern"]["email"] == 1)
            if(e["keyPattern"]["email"] == 1) {
                response
                .status(HttpStatus.BAD_REQUEST)
                .json({
                    message: ''
                })
                .send()
            }
        })
    }

}
