import { CampusesTypeOrmEntity } from '../../infrastructure/persistence/typeorm/campuses.typeorm-entity';
import { CreateCampusDto } from '../dtos/create-campus.dto';
import { UpdateCampusDto } from '../dtos/update-campus.dto';

export interface ICampusesRepository {
  create(createCampusDto: CreateCampusDto): Promise<CampusesTypeOrmEntity>;
  findAll(): Promise<CampusesTypeOrmEntity[]>;
  findOne(id: number): Promise<CampusesTypeOrmEntity | null>;
  update(
    id: number,
    updateCampusDto: UpdateCampusDto,
  ): Promise<CampusesTypeOrmEntity>;
  remove(id: number): Promise<void>;
  findActive(): Promise<CampusesTypeOrmEntity[]>;
}
