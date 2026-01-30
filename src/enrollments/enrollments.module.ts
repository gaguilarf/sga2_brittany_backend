import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsTypeOrmEntity } from './infrastructure/persistence/typeorm/enrollments.typeorm-entity';
import { StudentProgressTypeOrmEntity } from '../students/infrastructure/persistence/typeorm/student-progress.typeorm-entity';
import { EnrollmentsService } from './application/services/enrollments.service';
import { MonthlyDebtsService } from './application/services/monthly-debts.service';
import { EnrollmentsController } from './presentation/controllers/enrollments.controller';
import { DebtsModule } from '../debts/debts.module';
import { PlansModule } from '../plans/plans.module';
import { PaymentsModule } from '../payments/payments.module';

import { ConsumoTypeOrmEntity } from './infrastructure/persistence/typeorm/consumos.typeorm-entity';
import { AccountStatementService } from './application/services/account-statement.service';
import { DebtTypeOrmEntity } from '../debts/infrastructure/persistence/typeorm/debts.typeorm-entity';
import { PagoAdelantadoDetalleTypeOrmEntity } from '../payments/infrastructure/persistence/typeorm/pago-adelantado-detalle.typeorm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EnrollmentsTypeOrmEntity,
      StudentProgressTypeOrmEntity,
      ConsumoTypeOrmEntity,
      DebtTypeOrmEntity,
      PagoAdelantadoDetalleTypeOrmEntity,
    ]),
    forwardRef(() => DebtsModule),
    PlansModule,
    forwardRef(() => PaymentsModule),
  ],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService, MonthlyDebtsService, AccountStatementService],
  exports: [EnrollmentsService, MonthlyDebtsService, AccountStatementService],
})
export class EnrollmentsModule {}
