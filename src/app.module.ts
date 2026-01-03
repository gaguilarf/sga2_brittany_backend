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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    LeadsModule,
    AuthenticationModule,
    CampusesModule,
    PlansModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

