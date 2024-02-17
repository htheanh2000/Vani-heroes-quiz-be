
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
 
  // Find a user by phonenumber
  async findOne(phonenumber: string): Promise<User> {
    const user = await User.findOne({where: { phonenumber } });
    if (!user) {
      throw new NotFoundException(`User with phonenumber: ${phonenumber} not found`);
    }
    return user;
  }

  // Create user 
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, phonenumber } = createUserDto;
    console.log({createUserDto});
    
    // Check if the user already exists in the db
    const existingUser = await User.findOne({ where: { phonenumber } });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save the new user
    const user = new User();
    user.phonenumber = phonenumber;
    user.username = username;
    user.password = hashedPassword;
    return user.save();
  }
}