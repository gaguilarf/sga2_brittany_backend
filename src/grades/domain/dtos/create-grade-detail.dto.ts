import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateGradeDetailDto {
    @ApiProperty({ description: 'Grade ID', example: 1 })
    @IsInt()
    @IsNotEmpty()
    gradeId: number;

    @ApiProperty({ description: 'Section name (apartado)', example: 'Grammar', maxLength: 100, required: false })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    apartado?: string;

    @ApiProperty({ description: 'Score (puntaje)', example: 18.5 })
    @IsNumber()
    @IsOptional()
    puntaje?: number;
}
