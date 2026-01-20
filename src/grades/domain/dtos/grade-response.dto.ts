import { ApiProperty } from '@nestjs/swagger';
import { GradeDetailResponseDto } from './grade-detail-response.dto';

export class GradeResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  studentId: number;

  @ApiProperty({ example: '2024-I', required: false })
  ciclo?: string;

  @ApiProperty({ example: 1, required: false })
  mes?: number;

  @ApiProperty({ example: 2024, required: false })
  año?: number;

  @ApiProperty({ example: 17.5, required: false })
  notaFinal?: number;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: [GradeDetailResponseDto], required: false })
  details?: GradeDetailResponseDto[];
}
