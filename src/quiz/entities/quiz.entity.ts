import { Column, Model, Table, PrimaryKey, AutoIncrement, HasMany, CreatedAt } from 'sequelize-typescript';
import { Question } from './question.entity';

@Table
export class Quiz extends Model<Quiz> {
  @PrimaryKey
  @AutoIncrement
  @Column
  quizId!: number;

  @Column
  title!: string;

  @Column
  description!: string;

  @HasMany(() => Question)
  questions!: Question[];
}
