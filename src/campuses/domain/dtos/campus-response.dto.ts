import { ApiProperty } from '@nestjs/swagger';

export class CampusResponseDto {
  @ApiProperty({
    description: 'Campus ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Campus name',
    example: 'Sede Central Lima',
  })
  name: string;

  @ApiProperty({
    description: 'Campus address',
    example: 'Av. Javier Prado 123, San Isidro',
    required: false,
  })
  address?: string;

  @ApiProperty({
    description: 'District where campus is located',
    example: 'San Isidro',
    required: false,
  })
  district?: string;

  @ApiProperty({
    description: 'Campus active status',
    example: true,
  })
  active: boolean;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-15T10:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-15T10:30:00Z',
  })
  updatedAt: Date;
}
