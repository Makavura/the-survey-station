import { Controller, Post } from '@nestjs/common';
import { IUser } from 'src/models/user.model';
import { UsersService } from 'src/services/users.service';

@Controller('api/v1/users')
export class UsersController {


    constructor(private usersService: UsersService){}

    @Post()
    async createUser(credentials: IUser) {
        return await this.usersService.createUser(credentials);
    }

}
