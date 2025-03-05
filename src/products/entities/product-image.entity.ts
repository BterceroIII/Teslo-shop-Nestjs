import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductImage {
    
    @PrimaryGeneratedColumn()
    product_image_id: number;

    @Column({ type: 'text' })
    product_image_url: string;

    @ManyToOne(() => Product, (product) => product.product_images, { onDelete: 'CASCADE' })
    product: Product;
}