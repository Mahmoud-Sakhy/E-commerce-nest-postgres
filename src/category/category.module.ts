import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService], // ← مهم جدًا
  exports: [CategoryService], // ← دلوقتي ممكن Nest يصدره لأي module تاني
})
export class CategoryModule {}
