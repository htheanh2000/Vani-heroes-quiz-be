import { Injectable } from '@nestjs/common';
// Assume QuizEntity is your entity related to quizzes
import { Quiz } from './entities/quiz.entity';

@Injectable()
export class QuizService {

  async findAll(): Promise<Quiz[]> {
    return null
  }
}
