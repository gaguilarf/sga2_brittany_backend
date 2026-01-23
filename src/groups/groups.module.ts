import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsTypeOrmEntity } from './infrastructure/persistence/typeorm/groups.typeorm-entity';
import { GroupTeachersTypeOrmEntity } from './infrastructure/persistence/typeorm/group-teachers.typeorm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupsTypeOrmEntity, GroupTeachersTypeOrmEntity]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class GroupsModule {}
