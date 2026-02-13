import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './product.controller';
import { Product } from './product.entity';
import { Category } from 'src/category/category.entity';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Product, Category])],
})
export class ProductsModule {}
