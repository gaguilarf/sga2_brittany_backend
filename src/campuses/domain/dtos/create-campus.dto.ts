import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength, IsBoolean } from 'class-validator';

export class CreateCampusDto {
    @ApiProperty({
        description: 'Campus name',
        example: 'Sede Central Lima',
        maxLength: 255,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @ApiProperty({
        description: 'Campus address',
        example: 'Av. Javier Prado 123, San Isidro',
        maxLength: 255,
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(255)
    address?: string;

    @ApiProperty({
        description: 'District where campus is located',
        example: 'San Isidro',
        maxLength: 100,
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    district?: string;

    @ApiProperty({
        description: 'Campus active status',
        example: true,
        default: true,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
