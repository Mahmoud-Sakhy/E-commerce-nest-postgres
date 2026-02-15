import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { BrandController } from './brand.controller';

@Module({
  controllers: [BrandController],
  imports: [TypeOrmModule.forFeature([Brand])],
  exports: [TypeOrmModule],
})
export class BrandModule {}
