import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  Logger,
} from '@nestjs/common';
import type { Request } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { LeadsService } from '../../application/services/leads.service';
import { CreateLeadDto } from '../../domain/dtos/create-lead.dto';
import { UpdateLeadDto } from '../../domain/dtos/update-lead.dto';
import { LeadResponseDto } from '../../domain/dtos/lead-response.dto';
import { UseGuards } from '@nestjs/common';
import { OptionalJwtAuthGuard } from '../../../authentication/infrastructure/guards/optional-jwt-auth.guard';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
  private readonly logger = new Logger(LeadsController.name);
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear un nuevo lead',
    description: 'Registra un nuevo lead en el sistema con toda su información',
  })
  @ApiBody({ type: CreateLeadDto })
  @ApiResponse({
    status: 201,
    description: 'Lead creado exitosamente',
    type: LeadResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o error en la validación',
  })
  @UseGuards(OptionalJwtAuthGuard)
  async create(
    @Body() createLeadDto: CreateLeadDto,
    @Req() req: Request,
  ): Promise<LeadResponseDto> {
    const user = (req as any).user;

    if (user) {
      this.logger.log(
        `User detected in request: ${user.username} (${user.fullname || 'no fullname'})`,
      );
      createLeadDto.asesor = user.fullname || user.username || 'no asesor';
    } else {
      this.logger.log(
        'No user detected in request, setting asesor to "no asesor"',
      );
      createLeadDto.asesor = 'no asesor';
    }

    return this.leadsService.create(createLeadDto);
  }

  @Delete('cleanup/test-data')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Limpiar leads de prueba',
    description:
      'Elimina todos los leads registrados (uso interno para pruebas)',
  })
  async cleanup(): Promise<{ message: string }> {
    await this.leadsService.removeAll();
    return { message: 'Leads de prueba eliminados exitosamente' };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener todos los leads',
    description:
      'Retorna la lista completa de leads registrados, ordenados por fecha de registro descendente',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de leads obtenida exitosamente',
    type: [LeadResponseDto],
  })
  async findAll(): Promise<LeadResponseDto[]> {
    return this.leadsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener un lead por ID',
    description: 'Retorna la información detallada de un lead específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del lead (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Lead encontrado exitosamente',
    type: LeadResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Lead no encontrado',
  })
  async findOne(@Param('id') id: string): Promise<LeadResponseDto> {
    return this.leadsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Actualizar un lead',
    description: 'Actualiza parcialmente la información de un lead existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del lead (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({ type: UpdateLeadDto })
  @ApiResponse({
    status: 200,
    description: 'Lead actualizado exitosamente',
    type: LeadResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Lead no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  async update(
    @Param('id') id: string,
    @Body() updateLeadDto: UpdateLeadDto,
  ): Promise<LeadResponseDto> {
    return this.leadsService.update(id, updateLeadDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar un lead',
    description: 'Elimina permanentemente un lead del sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del lead (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 204,
    description: 'Lead eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Lead no encontrado',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.leadsService.remove(id);
  }
}
