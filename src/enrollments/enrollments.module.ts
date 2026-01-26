import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsTypeOrmEntity } from './infrastructure/persistence/typeorm/enrollments.typeorm-entity';
import { EnrollmentsService } from './application/services/enrollments.service';
import { MonthlyDebtsService } from './application/services/monthly-debts.service';
import { EnrollmentsController } from './presentation/controllers/enrollments.controller';
import { DebtsModule } from '../debts/debts.module';
import { PlansModule } from '../plans/plans.module';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EnrollmentsTypeOrmEntity]),
    forwardRef(() => DebtsModule),
    PlansModule,
    forwardRef(() => PaymentsModule),
  ],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService, MonthlyDebtsService],
  exports: [EnrollmentsService, MonthlyDebtsService],
})
export class EnrollmentsModule {}
