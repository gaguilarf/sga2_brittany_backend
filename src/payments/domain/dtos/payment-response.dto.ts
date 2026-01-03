import { ApiProperty } from '@nestjs/swagger';

export class PaymentResponseDto {
    @ApiProperty({ description: 'Payment ID', example: 1 })
    id: number;

    @ApiProperty({ description: 'Enrollment ID', example: 1 })
    enrollmentId: number;

    @ApiProperty({ description: 'Payment type', example: 'Mensualidad', required: false })
    tipo?: string;

    @ApiProperty({ description: 'Payment method', example: 'Efectivo', required: false })
    metodo?: string;

    @ApiProperty({ description: 'Amount', example: 150.00 })
    monto: number;

    @ApiProperty({ description: 'Receipt number', example: 'B001-000456', required: false })
    numeroBoleta?: string;

    @ApiProperty({ description: 'Payment date', example: '2024-01-15T10:30:00Z', required: false })
    fechaPago?: Date;

    @ApiProperty({ description: 'Campus ID', example: 1, required: false })
    campusId?: number;

    @ApiProperty({ description: 'Active status', example: true })
    active: boolean;

    @ApiProperty({ description: 'Creation timestamp' })
    createdAt: Date;

    @ApiProperty({ description: 'Last update timestamp' })
    updatedAt: Date;
}
