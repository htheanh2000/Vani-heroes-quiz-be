
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
 
  // Find a user by username
  async findOne(username: string): Promise<User> {
    const user = await User.findOne({where: { username } });
    if (!user) {
      throw new NotFoundException(`User with username: ${username} not found`);
    }
    return user;
  }

  // Create user 
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    // Check if the user already exists in the db
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('User already exists');

    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save the new user
    const user = new User();
    user.phonenumber = username;
    user.password = hashedPassword;
    return user.save();
  }
}