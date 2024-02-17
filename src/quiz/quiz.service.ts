import { Injectable, NotFoundException } from '@nestjs/common';
import { Question } from './entities/question.entity';
import { Quiz } from './entities/quiz.entity';
import { Option } from './entities/option.entity';

@Injectable()
export class QuizService {

  async findAll(): Promise<Quiz[]> {
    const quiz = Quiz.findAll();
    return quiz ;
  }

  async findOne(quizId: number): Promise<Quiz> {
    const quiz = await Quiz.findByPk(quizId, {
        include: [{ model: Question, include: [Option] }],
      });
    
      if (!quiz) {
        throw new NotFoundException(`Quiz with ID ${quizId} not found`);
      }
    
      return quiz;
    }
}