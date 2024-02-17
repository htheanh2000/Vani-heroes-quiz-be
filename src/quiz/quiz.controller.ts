import { Controller, Get } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from './entities/quiz.entity';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async findAll(): Promise<Quiz[]> {
    return this.quizService.findAll();
  }
}
