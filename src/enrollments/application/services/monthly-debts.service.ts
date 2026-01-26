import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { EnrollmentsTypeOrmEntity } from '../../infrastructure/persistence/typeorm/enrollments.typeorm-entity';
import { DebtsService } from '../../../debts/application/services/debts.service';
import { PricesService } from '../../../plans/application/services/prices.service';

@Injectable()
export class MonthlyDebtsService {
  private readonly logger = new Logger(MonthlyDebtsService.name);

  constructor(
    @InjectRepository(EnrollmentsTypeOrmEntity)
    private readonly enrollmentsRepository: Repository<EnrollmentsTypeOrmEntity>,
    private readonly debtsService: DebtsService,
    private readonly pricesService: PricesService,
  ) {}

  /**
   * Genera las deudas mensuales para todas las matrículas activas de tipo PLAN.
   * @param yearMonth Formato 'YYYY-MM'
   */
  async generateMonthlyDebts(
    yearMonth: string,
  ): Promise<{ processed: number; failures: number }> {
    this.logger.log(`Starting monthly debt generation for: ${yearMonth}`);

    // Obtener todas las matrículas activas de tipo PLAN
    const enrollments = await this.enrollmentsRepository.find({
      where: {
        active: true,
        enrollmentType: 'PLAN',
        estado: 'ACTIVA',
      },
      relations: ['plan', 'campus'],
    });

    let processed = 0;
    let failures = 0;

    for (const enrollment of enrollments) {
      try {
        // Verificar si ya existe una deuda de mensualidad para este mes y matrícula
        const existingDebts =
          await this.debtsService.getPendingDebtsByEnrollment(enrollment.id);
        const alreadyHasMonth = existingDebts.some(
          (d) => d.tipoDeuda === 'MENSUALIDAD' && d.mesAplicado === yearMonth,
        );

        if (alreadyHasMonth) {
          this.logger.warn(
            `Enrollment ${enrollment.id} already has monthly debt for ${yearMonth}. Skipping.`,
          );
          continue;
        }

        // Obtener precio para el plan y sede
        const prices = await this.pricesService.getPrice(
          enrollment.campusId,
          enrollment.planId,
        );

        // Crear deuda
        await this.debtsService.createDebt({
          enrollmentId: enrollment.id,
          tipoDeuda: 'MENSUALIDAD',
          concepto: `Mensualidad - ${yearMonth}`,
          monto: prices?.precioMensualidad || 280.0,
          fechaVencimiento: this.calculateDueDate(yearMonth),
          mesAplicado: yearMonth,
          estado: 'PENDIENTE',
        });

        processed++;
      } catch (error) {
        this.logger.error(
          `Failed to generate debt for enrollment ${enrollment.id}: ${error.message}`,
        );
        failures++;
      }
    }

    this.logger.log(
      `Generation completed. Processed: ${processed}, Failures: ${failures}`,
    );
    return { processed, failures };
  }

  private calculateDueDate(yearMonth: string): Date {
    // Las clases empiezan los 20 de cada mes, por lo tanto el vencimiento es ese día
    const [year, month] = yearMonth.split('-').map(Number);
    return new Date(year, month - 1, 20);
  }
}
