import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './product.controller';
import { Product } from './product.entity';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
