import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordHasherService } from 'src/common/services/password-hasher.service';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { plainToInstance } from 'class-transformer';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserResponseDto } from './dto/login-user-response.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordHasherService: PasswordHasherService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    try {
      const { password, ...userDate} = createUserDto;
      const hashedPassword = await this.passwordHasherService.hashPassword(password);
      const user = this.userRepository.create({
        ...userDate,
        password: hashedPassword
      });
      await this.userRepository.save(user);

      const responseUser = plainToInstance(CreateUserResponseDto, user, { 
        excludeExtraneousValues: true,
        enableImplicitConversion: true 
      });

      return responseUser;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async login(loginUser: LoginUserDto): Promise<LoginUserResponseDto>{
    try {
      const user = await this.userRepository.findOne({where: { email: loginUser.email }});
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const isPasswordValid = await this.passwordHasherService.comparePasswords(loginUser.password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid credentials');
      }
      const responseUser = plainToInstance(LoginUserResponseDto, user, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true
      });
      return responseUser;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  private handleDBError(error: any): never { 
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error)
    throw new InternalServerErrorException('Internal server error)');
  }

}
