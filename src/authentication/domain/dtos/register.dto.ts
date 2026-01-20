import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsInt,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Username for the new user',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @ApiProperty({
    description: 'Password for the new user',
    example: 'SecurePassword123!',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+51987654321',
    required: false,
  })
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Role ID for the user',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  roleId: number;
}
