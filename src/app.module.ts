import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LoginService } from './auth/login/login.service';
import { LogoutService } from './auth/logout/logout.service';
import { RegisterService } from './auth/register/register.service';
import { AuthController } from './auth/auth.controller';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { SwaggerModule } from './swagger/swagger.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [UserModule, AuthModule, CommonModule, DatabaseModule, SwaggerModule, ConfigModule],
  controllers: [AppController, AuthController],
  providers: [AppService, LoginService, LogoutService, RegisterService],
})
export class AppModule {}
