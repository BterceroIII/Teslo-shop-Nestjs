import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  IsOptional,
  IsArray,
  MinLength,
  MaxLength,
  IsPositive,
  IsInt,
  IsIn,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Product title must be a string' })
  @MinLength(1, { message: 'Product title must be at least 1 character long' })
  @MaxLength(50, {
    message: 'Product title must be at most 25 characters long',
  })
  product_title: string;

  @IsOptional()
  @IsNumber({}, { message: 'Product price must be a number' })
  @IsPositive({ message: 'Product price must be a positive number' })
  @Min(1, { message: 'Product price must be at least 1' })
  product_price: number;

  @IsOptional()
  @IsString({ message: 'Product description must be a string' })
  @MaxLength(255, {
    message: 'Product description must be at most 255 characters long',
  })
  product_description: string;

  @IsOptional()
  @IsString({ message: 'Product slug must be a string' })
  @MaxLength(100, {
    message: 'Product slug must be at most 100 characters long',
  })
  product_slug: string;

  @IsOptional()
  @IsPositive({ message: 'Product stock must be a positive number' })
  @IsInt()
  @Min(1, { message: 'Product stock must be at least 1' })
  product_stock: number;

  @IsNotEmpty({ message: 'Product category is required' })
  @IsArray({ message: 'Product sizes must be an array' })
  @IsString({ each: true, message: 'Each product size must be a string' })
  @MaxLength(100, {
    each: true,
    message: 'Each product size must be at most 100 characters long',
  })
  product_sizes: string[];

  @IsIn(['men', 'women', 'kids', 'unisex'])
  product_gender: string;

  @IsOptional()
  @IsArray({ message: 'Product tags must be an array' })
  @IsString({ each: true, message: 'Each product tag must be a string' })
  @MaxLength(100, {
    each: true,
    message: 'Each product tag must be at most 100 characters long',
  })
  product_tags: string[];
}
