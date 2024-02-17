import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/entities/user.entity';
import { HealthModule } from './health/health.module';
import { QuizModule } from './quiz/quiz.module';
import { Quiz } from './quiz/entities/quiz.entity';
import { Question } from './quiz/entities/question.entity';
import { Option } from './quiz/entities/option.entity';

import 'dotenv/config'

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Quiz, Option, Question], // Add all your models here
      autoLoadModels: true, // Auto load models
      synchronize: true, // Synchronize models with database
    }),

    UserModule, AuthModule, HealthModule, QuizModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
