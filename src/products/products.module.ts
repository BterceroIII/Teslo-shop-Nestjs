import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductImage } from './entities';
import { SeedService } from 'src/seed/seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService,TypeOrmModule],
})
export class ProductsModule {}
