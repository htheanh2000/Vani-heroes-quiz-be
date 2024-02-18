import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strips non-whitelisted properties
    forbidNonWhitelisted: true, // throw an error if non-whitelisted values are provided
    transform: true, // auto transform payloads to be objects typed according to their DTO classes
    disableErrorMessages: false, // set to true in production to prevent leaking sensitive errors
  }));

   // Enable CORS
   app.enableCors();


  const config = new DocumentBuilder()
    .setTitle('Vani heros example')
    .setDescription('The Quiz API description')
    .setVersion('1.0')
    .addTag('Quiz')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
