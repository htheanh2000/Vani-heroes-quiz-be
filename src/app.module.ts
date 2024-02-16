import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/entities/user.entity';
import { HealthModule } from './health/health.module';
import 'dotenv/config'

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User], // Add all your models here
      autoLoadModels: true, // Auto load models
      synchronize: true, // Synchronize models with database
    }),

    UserModule, AuthModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
