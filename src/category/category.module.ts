import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryController } from './category.controller';

@Module({
  controllers: [CategoryController],
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [TypeOrmModule],
})
export class CategoryModule {}
