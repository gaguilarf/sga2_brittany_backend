import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersTypeOrmEntity } from './infrastructure/persistence/typeorm/users.typeorm-entity';
import { UsersService } from './application/services/users.service';
import { UsersController } from './presentation/controllers/users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UsersTypeOrmEntity])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }
