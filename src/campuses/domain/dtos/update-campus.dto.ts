import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCampusDto } from './create-campus.dto';

export class UpdateCampusDto extends PartialType(CreateCampusDto) {
    @ApiProperty({
        description: 'Campus name',
        example: 'Sede Central Lima',
        maxLength: 255,
        required: false,
    })
    name?: string;

    @ApiProperty({
        description: 'Campus address',
        example: 'Av. Javier Prado 123, San Isidro',
        maxLength: 255,
        required: false,
    })
    address?: string;

    @ApiProperty({
        description: 'District where campus is located',
        example: 'San Isidro',
        maxLength: 100,
        required: false,
    })
    district?: string;

    @ApiProperty({
        description: 'Campus active status',
        example: true,
        required: false,
    })
    active?: boolean;
}
