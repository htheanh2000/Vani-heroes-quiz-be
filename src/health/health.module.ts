import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TerminusModule,
    HttpModule, // Add HttpModule here
    TypeOrmModule,
  ],
  controllers: [HealthController],
})
export class HealthModule {}