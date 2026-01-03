import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength, IsBoolean } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty({
        description: 'Role name',
        example: 'Administrador',
        maxLength: 100,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @ApiProperty({
        description: 'Role description',
        example: 'Acceso total al sistema',
        maxLength: 255,
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(255)
    description?: string;

    @ApiProperty({
        description: 'Role active status',
        example: true,
        default: true,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
