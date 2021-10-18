import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService  } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { Survey, SurveySchema } from './models/survey.model';
import { SurveysController } from './controllers/surveys.controller';
import { SurveysService } from './services/surveys.service';
import { UsersService } from './services/users.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { join } from 'path';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
@Module({
  imports: [
    ConfigModule.forRoot(
      ({
        envFilePath: '.env',
        isGlobal: true
      })
    ),
    MongooseModule.forRoot(
      process.env.MONGO_DB_URL, 
      { 
        useNewUrlParser: true
      }
    ),
    MongooseModule.forFeature(
      [
        {
          name: User.name, schema: UserSchema
        },
        {
          name: Survey.name, schema: SurveySchema
        }
      ]
    ),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1800s'}
      }),
      inject: [ConfigService],
    }),
/*     ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../','survey-frontend/dist/survey-frontend'),
      exclude: ['/api*'],
    }), */
  ],
  controllers: [
    SurveysController,
    UsersController,  
    AuthController
  ],
  providers: [
    AuthService,
    SurveysService,
    UsersService,
    JwtStrategy
  ],
})

export class AppModule {}
