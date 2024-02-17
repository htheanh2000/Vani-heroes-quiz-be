import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, CreatedAt } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity'; // Assuming User entity is defined elsewhere
import { Question } from './question.entity';
import { Option } from './option.entity';

@Table
export class UserResponse extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  responseId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Question)
  @Column
  questionId: number;

  @ForeignKey(() => Option)
  @Column
  optionId: number;

  @CreatedAt
  createdAt: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Question)
  question: Question;

  @BelongsTo(() => Option)
  option: Option;
}
