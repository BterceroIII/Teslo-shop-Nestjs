import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { configValidationSchema } from './config/validation.config';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { join } from 'path';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        const parsedConfig = configValidationSchema.safeParse(config);
        if (!parsedConfig.success) {
          throw new Error(
            parsedConfig.error.errors.map((error) => error.message).join('\n'),
          );
        }
        return parsedConfig.data;
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), 
    }),
    ProductsModule,
    CommonModule,
    SeedModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
