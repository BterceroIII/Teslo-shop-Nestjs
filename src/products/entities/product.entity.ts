import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column({ type: 'text', nullable: false, unique: true })
  product_title: string;

  @Column({ type: 'numeric', nullable: false, default: 0 })
  product_price: number;

  @Column({ type: 'text', nullable: true })
  product_description: string;

  @Column({ type: 'text', nullable: false, unique: true })
  product_slug: string;

  @Column({ type: 'numeric', nullable: false, default: 0 })
  product_stock: number;

  @Column({ type: 'text', array: true })
  product_sizes: string[];

  @Column({ type: 'text' })
  product_gender: string;
}
