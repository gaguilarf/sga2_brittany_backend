import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsTypeOrmEntity } from './infrastructure/persistence/typeorm/payments.typeorm-entity';
import { PaymentsService } from './application/services/payments.service';
import { PaymentsController } from './presentation/controllers/payments.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PaymentsTypeOrmEntity])],
    controllers: [PaymentsController],
    providers: [PaymentsService],
    exports: [PaymentsService],
})
export class PaymentsModule { }
