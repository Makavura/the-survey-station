import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { IUser } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/v1/auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    async login(@Body() credentials: IUser) {
        return this.authService.login(credentials)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async test() {
        return 'Success!';
    }
}
