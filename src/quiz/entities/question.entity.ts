import { Column, Model, Table, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany, CreatedAt } from 'sequelize-typescript';
import { Quiz } from './quiz.entity';
import { Option } from './option.entity';

@Table
export class Question extends Model<Question> {
  @PrimaryKey
  @AutoIncrement
  @Column
  questionId!: number;

  @ForeignKey(() => Quiz)
  @Column
  quizId!: number;

  @Column
  text!: string;

  @Column
  hint!: string;

  @BelongsTo(() => Quiz)
  quiz!: Quiz;

  @HasMany(() => Option)
  options!: Option[];
}
