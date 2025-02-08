import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}


  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.productRepository.create(createProductDto);
      return this.productRepository.save(product);
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException('Product could not be created');
    }

  }

  findAll() {
    return `This action returns all products`;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ product_id: id });
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
