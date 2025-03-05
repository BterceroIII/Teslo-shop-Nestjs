import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from '../common/dto/pagination.dto';
import { validate as isUUID } from 'uuid';
import { ProductImage, Product } from './entities';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { product_images = [], ...productDetails } = createProductDto;
      const product = this.productRepository.create({...productDetails, 
        product_images: product_images.map(product_images => this.productImageRepository.create({product_image_url: product_images}))});
      await this.productRepository.save(product);
      return {...product, product_images};
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
      relations: {
        product_images: true,
      }
    });
    if (!products) {
      throw new BadRequestException('No products found');
    }
    return products.map( product => ({
      ...product,
      product_images: product.product_images.map(product_image => product_image.product_image_url)
    }));
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
        .leftJoinAndSelect('product.product_images', 'product_images')
        .getOne();
    }
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    return product
  }

  async findOnePlain(term: string){
    const { product_images = [], ...rest } = await this.findOne(term);
    return {
      ...rest,
      product_images: product_images.map(product_image => product_image.product_image_url)
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    const { product_images, ...toUpdate } = updateProductDto;

    const product = await this.productRepository.preload({
      product_id: id,
      ...toUpdate,
    });

    if (!product) {
      throw new NotFoundException(
        `Product with ${product.product_id} not found`,
      );
    }

    // query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      if (product_images) {
        await queryRunner.manager.delete(ProductImage, { product: {product_id: id} });
        product.product_images = product_images.map(product_image => this.productImageRepository.create({product_image_url: product_image}));
      }
      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      //await this.productRepository.save(product);
      return this.findOnePlain(id);
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.logger.error(error.message);
    }
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

  async remove(id: string) {
    const product = await this.productRepository.findOneBy({ product_id: id });
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    await this.productRepository.remove(product);
    return `This action removes a #${id} product`;
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      this.handleDBExceptions(error);
    }

  }
  
}
