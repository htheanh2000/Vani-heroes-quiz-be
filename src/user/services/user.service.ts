
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as CryptoJS from 'crypto-js';
import 'dotenv/config'
import { createHmac } from 'crypto';


@Injectable()
export class UserService {
 
  hashPhoneNumber(phonenumber: string): string {
    return createHmac('sha256', process.env.SECRET_KEY)
      .update(phonenumber)
      .digest('hex');
  }
  

  // Find a user by phonenumber
  async findOne(phonenumber: string): Promise<User> {
    console.log("phonenumber",phonenumber);
    
    // const encryptedPhoneNumber = CryptoJS.AES.encrypt(phonenumber, process.env.SECRET_KEY).toString();
    const encryptedPhoneNumber = this.hashPhoneNumber(phonenumber) ;

    const user = await User.findOne({where: { phonenumber: encryptedPhoneNumber } });
    if (!user) {
      throw new NotFoundException(`User with phonenumber: ${phonenumber} not found`);
    }
    return user;
  }

  async updateLastSignIn(userId: string) {
    await User.update(
      { lastsignin: new Date() }, // Set lastsignin to the current date and time
      { 
        where: { id: userId }, // Assuming the unique identifier is id
        returning: true, // For PostgreSQL, returns the affected rows
      }
    );
  }


  // Create user 
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, phonenumber } = createUserDto;
    console.log({createUserDto});
    
    // Check if the user already exists in the db
    // const encryptedPhoneNumber = CryptoJS.AES.encrypt(phonenumber, process.env.SECRET_KEY).toString();
    const encryptedPhoneNumber = this.hashPhoneNumber(phonenumber) ;

    const existingUser = await User.findOne({ where: { phonenumber: encryptedPhoneNumber } });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save the new user
    const user = new User();
    user.phonenumber = encryptedPhoneNumber;
    user.username = username;
    user.password = hashedPassword;
    return user.save();
  }
}