import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateGradeDto {
    @ApiProperty({ description: 'Student ID', example: 1 })
    @IsInt()
    @IsNotEmpty()
    studentId: number;

    @ApiProperty({ description: 'Cycle (ciclo)', example: '2024-I', maxLength: 100, required: false })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    ciclo?: string;

    @ApiProperty({ description: 'Month (mes)', example: 1, required: false })
    @IsInt()
    @IsOptional()
    mes?: number;

    @ApiProperty({ description: 'Year (año)', example: 2024, required: false })
    @IsInt()
    @IsOptional()
    año?: number;

    @ApiProperty({ description: 'Final grade', example: 17.5, required: false })
    @IsNumber()
    @IsOptional()
    notaFinal?: number;
}
