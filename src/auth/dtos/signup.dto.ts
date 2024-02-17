import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {

  @ApiProperty({
    example: '0782778712',
    description: 'The phonenumber of the user',
  })
  @IsNotEmpty()
  @IsString()
  phonenumber: string;


  @ApiProperty({
    example: 'theanh',
    description: 'The username of the user',
  })
  @IsNotEmpty()
  @IsString()
  username: string;


  @ApiProperty({
    example: '123456',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
