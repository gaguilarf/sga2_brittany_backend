import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersTypeOrmEntity } from '../../../users/infrastructure/persistence/typeorm/users.typeorm-entity';
import { RegisterDto } from '../../domain/dtos/register.dto';
import { LoginDto } from '../../domain/dtos/login.dto';
import { AuthResponseDto } from '../../domain/dtos/auth-response.dto';
import { JwtPayload } from '../../domain/interfaces/jwt-payload.interface';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    @InjectRepository(UsersTypeOrmEntity)
    private readonly usersRepository: Repository<UsersTypeOrmEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    try {
      this.logger.log(`Registering new user: ${registerDto.username}`);

      // Check if username already exists
      const existingUser = await this.usersRepository.findOne({
        where: { username: registerDto.username },
      });

      if (existingUser) {
        throw new ConflictException('Username already exists');
      }

      // Check if email already exists
      const existingEmail = await this.usersRepository.findOne({
        where: { email: registerDto.email },
      });

      if (existingEmail) {
        throw new ConflictException('Email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      // Create user
      const user = this.usersRepository.create({
        username: registerDto.username,
        password: hashedPassword,
        fullname: registerDto.fullname,
        email: registerDto.email,
        phone: registerDto.phone,
        roleId: registerDto.roleId,
        active: true,
      });

      const savedUser = await this.usersRepository.save(user);

      this.logger.log(`User registered successfully: ${savedUser.username}`);

      return this.toAuthResponse(savedUser);
    } catch (error) {
      this.logger.error(
        `Error registering user: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    try {
      this.logger.log(`Login attempt for user: ${loginDto.username}`);

      const user = await this.validateUser(
        loginDto.username,
        loginDto.password,
      );

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: JwtPayload = {
        sub: user.id,
        username: user.username,
        roleId: user.roleId,
      };

      const accessToken = this.jwtService.sign(payload);

      this.logger.log(`User logged in successfully: ${user.username}`);

      return {
        ...this.toAuthResponse(user),
        accessToken,
      };
    } catch (error) {
      this.logger.error(`Error during login: ${error.message}`, error.stack);
      throw error;
    }
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UsersTypeOrmEntity | null> {
    const user = await this.usersRepository.findOne({
      where: { username, active: true },
      relations: ['role'],
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async getCurrentUser(userId: number): Promise<AuthResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { id: userId, active: true },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toAuthResponse(user);
  }

  async refreshToken(userId: number): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.findOne({
      where: { id: userId, active: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      roleId: user.roleId,
    };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  private toAuthResponse(user: UsersTypeOrmEntity): AuthResponseDto {
    return {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      roleId: user.roleId,
      roleName: user.role?.name,
    };
  }
}
