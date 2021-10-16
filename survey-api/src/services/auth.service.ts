import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/models/user.model';

@Injectable()
export class AuthService {

    constructor(        
        private usersService: UsersService,
        private jwtService: JwtService
        ){ }

    async login(credentials: IUser){

        const user = await this.usersService.fetchUserByEmail(credentials["email"])
        const payload = {
            userId: user["_id"]
        }
        return {
            access_token: this.jwtService.sign(payload)
        }

    }

    async authenticateUser(credentials: IUser){
        const user = await this.usersService.fetchUserByEmail(credentials["email"])
        if(!(await this.usersService.validatePassword(credentials))) {
            throw new UnauthorizedException();
        }
        return user;
    }

    
}
