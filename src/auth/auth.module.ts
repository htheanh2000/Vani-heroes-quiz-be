import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/services/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'jllgshllWEUJHGHYJkjsfjds90', //TODO: Replace with secret key from env
      signOptions: { expiresIn: '1d' }, // Adjust the expiration as needed
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, UserService], // Add FacebookStrategy to the providers
})
export class AuthModule {}