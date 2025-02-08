import { IsNotEmpty, IsNumber, IsString, Min, IsOptional, IsArray, MinLength, MaxLength } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty({ message: 'Product ID is required' })
    @IsString({ message: 'Product ID must be a string' })
    product_id: string;
    
    @IsNotEmpty({ message: 'Product title is required' })
    @IsString({ message: 'Product title must be a string' })
    @MinLength(1, { message: 'Product title must be at least 1 character long' })
    @MaxLength(50, { message: 'Product title must be at most 25 characters long' })
    product_title: string;
    
    @IsNotEmpty({ message: 'Product price is required' })
    @IsNumber({}, { message: 'Product price must be a number' })
    @Min(1, { message: 'Product price must be at least 1' })
    product_price: number;
    
    @IsOptional()
    @IsString({ message: 'Product description must be a string' })
    @MaxLength(255, { message: 'Product description must be at most 255 characters long' })
    product_description: string;
    
    @IsOptional()
    @IsString({ message: 'Product slug must be a string' })
    @MaxLength(100, { message: 'Product slug must be at most 100 characters long' })
    product_slug: string;
    
    @IsOptional()
    @IsNumber({}, { message: 'Product stock must be a number' })
    @Min(1, { message: 'Product stock must be at least 1' })
    product_stock: number;
    
    @IsOptional()
    @IsArray({ message: 'Product sizes must be an array' })
    @IsString({ each: true, message: 'Each product size must be a string' })
    @MaxLength(100, { each: true, message: 'Each product size must be at most 100 characters long' })
    product_sizes: string[];
    
    @IsOptional()
    @IsString({ message: 'Product gender must be a string' })
    @MaxLength(100, { message: 'Product gender must be at most 100 characters long' })
    product_gender: string;
}
