
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
 
  // Find a user by ID
  async findOne(id: number): Promise<User> {
    const user = await User.findOne({where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}