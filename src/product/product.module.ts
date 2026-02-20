import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from '../category/category.module';
import { BrandModule } from 'src/brand/brand.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]), // ← مهم
    CategoryModule,
    BrandModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService, BrandModule],
})
export class ProductsModule {}
