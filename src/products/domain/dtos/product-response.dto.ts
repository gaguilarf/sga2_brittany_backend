import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Examen Internacional British Council' })
  name: string;

  @ApiProperty({ example: false, description: 'Si requiere horario de clases' })
  requiresSchedule: boolean;

  @ApiProperty({ example: true, description: 'Si requiere fecha de examen' })
  requiresExamDate: boolean;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
