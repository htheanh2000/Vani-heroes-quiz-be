import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  providers: [QuizService,JwtStrategy ],
  controllers: [QuizController]
})
export class QuizModule {}
