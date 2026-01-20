import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesTypeOrmEntity } from './infrastructure/persistence/typeorm/roles.typeorm-entity';
import { RolesService } from './application/services/roles.service';
import { RolesController } from './presentation/controllers/roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RolesTypeOrmEntity])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
