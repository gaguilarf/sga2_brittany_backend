import { ApiProperty } from '@nestjs/swagger';

export class GradeDetailResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 1 })
    gradeId: number;

    @ApiProperty({ example: 'Grammar', required: false })
    apartado?: string;

    @ApiProperty({ example: 18.5, required: false })
    puntaje?: number;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
