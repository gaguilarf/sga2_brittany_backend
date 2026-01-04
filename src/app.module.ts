import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { LeadsModule } from './leads/leads.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CampusesModule } from './campuses/campuses.module';
import { PlansModule } from './plans/plans.module';
import { StudentsModule } from './students/students.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { PaymentsModule } from './payments/payments.module';
import { GradesModule } from './grades/grades.module';
import { AttendanceModule } from './attendance/attendance.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    LeadsModule,
    AuthenticationModule,
    RolesModule,
    UsersModule,
    CampusesModule,
    PlansModule,
    StudentsModule,
    EnrollmentsModule,
    PaymentsModule,
    GradesModule,
    AttendanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

