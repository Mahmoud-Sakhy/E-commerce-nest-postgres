import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './product.controller';
import { Product } from './product.entity';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
