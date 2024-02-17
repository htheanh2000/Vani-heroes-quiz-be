import { Controller, Get, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';
import { Option } from './entities/option.entity';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async findAll(): Promise<Quiz[]> {
    return this.quizService.findAll();
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz by ID' })
  @ApiResponse({ status: 200, description: 'The quiz details.' })
  @ApiResponse({ status: 404, description: 'Quiz not found.' })
  @ApiParam({ name: 'id', type: 'number' })
  @Get(':id')
  async getQuizById(@Param('id') id: number): Promise<Quiz> {
    return this.quizService.findOne(id);
  }
}
