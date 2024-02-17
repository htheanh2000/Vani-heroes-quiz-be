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

    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload),
    };

  }

  async signUp(signUpDto: SignUpDto) {
    const { password } = signUpDto;
    const newUser = await this.userService.create({
      ...signUpDto,
      password: password,
    });

    const { password: _, ...result } = newUser;
    return result;
  }
}


