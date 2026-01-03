import { ApiProperty } from '@nestjs/swagger';

export class AttendanceResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 1 })
    studentId: number;

    @ApiProperty({ example: '2024-01-15' })
    fecha: Date;

    @ApiProperty({ example: 'Presente', required: false })
    estado?: string;

    @ApiProperty({ example: 1 })
    teacherId: number;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
