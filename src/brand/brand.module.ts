import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
