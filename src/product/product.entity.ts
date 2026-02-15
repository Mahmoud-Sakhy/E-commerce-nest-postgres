import { Brand } from 'src/brand/brand.entity';
import { Category } from '../category/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItem } from 'src/cart/cart-item.entity';
import { OrderItem } from 'src/order/order-item.entity';
import { Wishlist } from 'src/wishlist/wishlist.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column({ length: 100, unique: true })
  slug: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  imagePublicId?: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  compareAtPrice: number;

  @Column('simple-array', { nullable: true })
  colors?: string[];

  @Column('simple-array', { nullable: true })
  sizes?: string[];

  @Column({ default: 0 })
  stock: number;

  @Column({ default: true })
  isAvailable: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => Brand, (brand) => brand.products, { nullable: true })
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column({ nullable: true })
  brandId?: string;

  @OneToMany(() => CartItem, (item) => item.product)
  cartItems: CartItem[];

  /* ================= Orders ================= */
  @OneToMany(() => OrderItem, (item) => item.product)
  orderItems: OrderItem[];

  /* ================= Wishlist ================= */
  @OneToMany(() => Wishlist, (wishlist) => wishlist.product)
  wishlists: Wishlist[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
