// src/user/entities/user.entity.ts

import { Column, Model, Table } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

@Table
export class User extends Model<User> {
  @Column({ primaryKey: true, defaultValue: UUIDV4 })
  id: string;

  @Column
  username: string;

  @Column
  password: string;  // should be hashed value

  @Column({unique: true}) // duplication checked based on mobile phone number
  phonenumber: string;   // should be encrypted using AES256

}