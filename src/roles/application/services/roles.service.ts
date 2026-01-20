import {
  Injectable,
  NotFoundException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesTypeOrmEntity } from '../../infrastructure/persistence/typeorm/roles.typeorm-entity';
import { CreateRoleDto } from '../../domain/dtos/create-role.dto';
import { UpdateRoleDto } from '../../domain/dtos/update-role.dto';
import { RoleResponseDto } from '../../domain/dtos/role-response.dto';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  constructor(
    @InjectRepository(RolesTypeOrmEntity)
    private readonly rolesRepository: Repository<RolesTypeOrmEntity>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
    try {
      this.logger.log(`Creating new role: ${createRoleDto.name}`);

      // Check if role name already exists
      const existingRole = await this.rolesRepository.findOne({
        where: { name: createRoleDto.name },
      });

      if (existingRole) {
        throw new ConflictException(
          `Role with name "${createRoleDto.name}" already exists`,
        );
      }

      const role = this.rolesRepository.create(createRoleDto);
      const savedRole = await this.rolesRepository.save(role);

      this.logger.log(`Role created successfully with ID: ${savedRole.id}`);
      return this.toResponseDto(savedRole);
    } catch (error) {
      this.logger.error(`Error creating role: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(): Promise<RoleResponseDto[]> {
    try {
      this.logger.log('Fetching all roles');
      const roles = await this.rolesRepository.find({
        order: { name: 'ASC' },
      });
      return roles.map((r) => this.toResponseDto(r));
    } catch (error) {
      this.logger.error(`Error fetching roles: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOne(id: number): Promise<RoleResponseDto> {
    try {
      this.logger.log(`Fetching role with ID: ${id}`);
      const role = await this.rolesRepository.findOne({
        where: { id },
      });

      if (!role) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }

      return this.toResponseDto(role);
    } catch (error) {
      this.logger.error(
        `Error fetching role ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(
    id: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<RoleResponseDto> {
    try {
      this.logger.log(`Updating role with ID: ${id}`);
      const role = await this.rolesRepository.findOne({
        where: { id },
      });

      if (!role) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }

      // If name is being changed, check for conflicts
      if (updateRoleDto.name && updateRoleDto.name !== role.name) {
        const existingRole = await this.rolesRepository.findOne({
          where: { name: updateRoleDto.name },
        });
        if (existingRole) {
          throw new ConflictException(
            `Role with name "${updateRoleDto.name}" already exists`,
          );
        }
      }

      Object.assign(role, updateRoleDto);
      const updatedRole = await this.rolesRepository.save(role);

      this.logger.log(`Role updated successfully: ID ${updatedRole.id}`);
      return this.toResponseDto(updatedRole);
    } catch (error) {
      this.logger.error(
        `Error updating role ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      this.logger.log(`Removing role with ID: ${id}`);
      const role = await this.rolesRepository.findOne({
        where: { id },
        relations: ['users'],
      });

      if (!role) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }

      // Prevent deletion if role is in use
      if (role.users && role.users.length > 0) {
        throw new ConflictException(
          `Cannot delete role with ID ${id} because it is assigned to users`,
        );
      }

      await this.rolesRepository.remove(role);
      this.logger.log(`Role removed successfully: ID ${id}`);
    } catch (error) {
      this.logger.error(
        `Error removing role ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  private toResponseDto(entity: RolesTypeOrmEntity): RoleResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      active: entity.active,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
