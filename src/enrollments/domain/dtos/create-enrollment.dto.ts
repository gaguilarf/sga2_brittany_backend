import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateEnrollmentDto {
    @ApiProperty({ description: 'Student ID', example: 1 })
    @IsInt()
    @IsNotEmpty()
    studentId: number;

    @ApiProperty({ description: 'Campus ID', example: 1 })
    @IsInt()
    @IsNotEmpty()
    campusId: number;

    @ApiProperty({ description: 'Plan ID', example: 1 })
    @IsInt()
    @IsNotEmpty()
    planId: number;

    @ApiProperty({ description: 'Modality', example: 'Presencial', maxLength: 100, required: false })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    modalidad?: string;

    @ApiProperty({ description: 'Schedule', example: 'Lunes y Miércoles 6pm-8pm', maxLength: 100, required: false })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    horario?: string;

    @ApiProperty({ description: 'Level', example: 'Básico', maxLength: 100, required: false })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    nivel?: string;

    @ApiProperty({ description: 'Enrollment type', example: 'Nueva', maxLength: 100, required: false })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    tipoInscripcion?: string;

    @ApiProperty({ description: 'Advisor ID', example: 1 })
    @IsInt()
    @IsNotEmpty()
    advisorId: number;

    @ApiProperty({ description: 'Origin', example: 'Facebook', maxLength: 100, required: false })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    origen?: string;

    @ApiProperty({ description: 'Receipt number', example: 'B001-00123', maxLength: 50, required: false })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    numeroBoleta?: string;

    @ApiProperty({ description: 'Balance', example: 0, required: false })
    @IsNumber()
    @IsOptional()
    saldo?: number;
}
