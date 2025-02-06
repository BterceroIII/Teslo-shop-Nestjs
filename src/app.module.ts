import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { configValidationSchema } from './config/validation.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        const parsedConfig = configValidationSchema.safeParse(config);
        if (!parsedConfig.success) {
          throw new Error(parsedConfig.error.errors.map((error) => error.message).join('\n'));
        }
        return parsedConfig.data;
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService],
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
