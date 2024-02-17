import { Column, Model, Table, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, CreatedAt } from 'sequelize-typescript';
import { Question } from './question.entity';

@Table
export class Option extends Model<Option> {
  @PrimaryKey
  @AutoIncrement
  @Column
  optionId!: number;

  @ForeignKey(() => Question)
  @Column
  questionId!: number;

  @Column
  text!: string;

  @Column
  isCorrect!: boolean;

  @BelongsTo(() => Question)
  question!: Question;
}
