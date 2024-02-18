import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/services/user.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(phonenumber: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(phonenumber);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.phonenumber, loginDto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = user.dataValues
    console.log(payload);
    
    await this.userService.updateLastSignIn(payload.id) ;

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        username: payload.username,
      }
    };

  }

  async signUp(signUpDto: SignUpDto) {
    const { password } = signUpDto;
    const newUser = await this.userService.create({
      ...signUpDto,
      password: password,
    });

    const user = {
      username: newUser.username,
    }
    return {
      access_token: this.jwtService.sign(user),
      user: {
        username: newUser.username,
      }
    };
  }
}


