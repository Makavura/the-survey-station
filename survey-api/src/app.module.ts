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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'survey-frontend/dist/survey-frontend'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [
    SurveysController
  ],
  providers: [
    SurveysService,
    UsersService,
    JwtStrategy
  ],
})

export class AppModule {}
