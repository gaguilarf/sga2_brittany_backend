import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiCookieAuth, ApiParam } from '@nestjs/swagger';
import { RolesService } from '../../application/services/roles.service';
import { CreateRoleDto } from '../../domain/dtos/create-role.dto';
import { UpdateRoleDto } from '../../domain/dtos/update-role.dto';
import { RoleResponseDto } from '../../domain/dtos/role-response.dto';
import { JwtAuthGuard } from '../../../authentication/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from '../../../authentication/infrastructure/guards/roles.guard';
import { Roles } from '../../../authentication/infrastructure/decorators/roles.decorator';

@ApiTags('Roles')
@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiCookieAuth()
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Post()
    @Roles(1) // Only Administrador can create roles
    @ApiOperation({ summary: 'Create a new role' })
    @ApiResponse({ status: 201, description: 'Role created successfully', type: RoleResponseDto })
    async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
        return this.rolesService.create(createRoleDto);
    }

    @Get()
    @Roles(1, 3) // Admin and Developer can list roles
    @ApiOperation({ summary: 'Get all roles' })
    @ApiResponse({ status: 200, description: 'List of all roles', type: [RoleResponseDto] })
    async findAll(): Promise<RoleResponseDto[]> {
        return this.rolesService.findAll();
    }

    @Get(':id')
    @Roles(1, 3) // Admin and Developer
    @ApiOperation({ summary: 'Get role by ID' })
    @ApiParam({ name: 'id', description: 'Role ID', type: Number })
    @ApiResponse({ status: 200, description: 'Role found', type: RoleResponseDto })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<RoleResponseDto> {
        return this.rolesService.findOne(id);
    }

    @Patch(':id')
    @Roles(1) // Only Administrador can update roles
    @ApiOperation({ summary: 'Update role by ID' })
    @ApiParam({ name: 'id', description: 'Role ID', type: Number })
    @ApiResponse({ status: 200, description: 'Role updated successfully', type: RoleResponseDto })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRoleDto: UpdateRoleDto,
    ): Promise<RoleResponseDto> {
        return this.rolesService.update(id, updateRoleDto);
    }

    @Delete(':id')
    @Roles(1) // Only Administrador
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete role by ID' })
    @ApiParam({ name: 'id', description: 'Role ID', type: Number })
    @ApiResponse({ status: 204, description: 'Role deleted successfully' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.rolesService.remove(id);
    }
}
