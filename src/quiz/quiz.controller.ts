import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from './entities/quiz.entity';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async findAll(): Promise<Quiz[]> {
    return this.quizService.findAll();
  }
  
  @ApiOperation({ summary: 'Get a quiz by ID' })
  @ApiResponse({ status: 200, description: 'The quiz details.' })
  @ApiResponse({ status: 404, description: 'Quiz not found.' })
  @ApiParam({ name: 'id', type: 'number' })
  @Get(':id')
  @ApiBearerAuth('access-token')
  // @UseGuards(AuthGuard('jwt')) // Secure this route
  async getQuizById(@Param('id') id: number): Promise<Quiz> {
    return this.quizService.findOne(id);
  }
}
