import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Product could not be created');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      //TODO: relations
    });
    if (!products) {
      throw new BadRequestException('No products found');
    }
    return products;
  }

  async findOne(term: string) {
    let product: Product;

    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ product_id: term });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder();
      product = await queryBuilder
        .where(
          'UPPER(product_title) =:product_title or product_slug =:product_slug',
          {
            product_title: term.toUpperCase(),
            product_slug: term.toLowerCase(),
          },
        )
        .getOne();
    }
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      product_id: id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(
        `Product with ${product.product_id} not found`,
      );
    }

    try {
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async remove(id: string) {
    const product = await this.productRepository.findOneBy({ product_id: id });
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    await this.productRepository.remove(product);
    return `This action removes a #${id} product`;
  }
}
