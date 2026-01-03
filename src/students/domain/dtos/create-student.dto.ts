import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength, IsInt, IsEmail, IsDateString } from 'class-validator';

export class CreateStudentDto {
    @ApiProperty({
        description: 'Student full name',
        example: 'Juan Carlos Pérez García',
        maxLength: 255,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    nombre: string;

    @ApiProperty({
        description: 'Student DNI (National ID)',
        example: '12345678',
        maxLength: 20,
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(20)
    dni?: string;

    @ApiProperty({
        description: 'Student birth date',
        example: '2005-03-15',
        required: false,
    })
    @IsDateString()
    @IsOptional()
    fechaNacimiento?: string;

    @ApiProperty({
        description: 'Student age',
        example: 18,
        required: false,
    })
    @IsInt()
    @IsOptional()
    edad?: number;

    @ApiProperty({
        description: 'District where student lives',
        example: 'San Isidro',
        maxLength: 100,
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    distrito?: string;

    @ApiProperty({
        description: 'Student phone number',
        example: '+51987654321',
        maxLength: 20,
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(20)
    celularAlumno?: string;

    @ApiProperty({
        description: 'Guardian phone number',
        example: '+51987654322',
        maxLength: 20,
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(20)
    celularApoderado?: string;

    @ApiProperty({
        description: 'Student email',
        example: 'juan.perez@example.com',
        maxLength: 255,
        required: false,
    })
    @IsEmail()
    @IsOptional()
    @MaxLength(255)
    correo?: string;
}
