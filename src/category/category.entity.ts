import { Product } from 'src/product/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ length: 100, unique: true })
  slug: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
