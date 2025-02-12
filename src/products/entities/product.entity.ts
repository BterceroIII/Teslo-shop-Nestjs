import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column({ type: 'text', nullable: false, unique: true })
  product_title: string;

  @Column({ type: 'float', nullable: false, default: 0 })
  product_price: number;

  @Column({ type: 'text' })
  product_description: string;

  @Column({ type: 'text', unique: true })
  product_slug: string;

  @Column({ type: 'numeric', default: 0 })
  product_stock: number;

  @Column({ type: 'text', array: true })
  product_sizes: string[];

  @Column({ type: 'text' })
  product_gender: string;

  @Column({ type: 'text', array: true, default: [] })
  product_tags: string[];

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.product_slug) {
      this.product_slug = this.product_title
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    if (!this.product_slug) {
      this.product_slug = this.product_title
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
  }
}
