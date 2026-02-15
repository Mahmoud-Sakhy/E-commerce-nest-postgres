import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './create-brand.dto';
import { UpdateBrandDto } from './update-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepo: Repository<Brand>,
  ) {}

  create(dto: CreateBrandDto) {
    const brand = this.brandRepo.create(dto);
    return this.brandRepo.save(brand);
  }

  findAll() {
    return this.brandRepo.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string) {
    const brand = await this.brandRepo.findOneBy({ id });
    if (!brand) throw new NotFoundException('Brand not found');
    return brand;
  }

  async update(id: string, dto: UpdateBrandDto) {
    const brand = await this.findOne(id);
    Object.assign(brand, dto);
    return this.brandRepo.save(brand);
  }

  async remove(id: string) {
    const brand = await this.findOne(id);
    await this.brandRepo.remove(brand);
    return { message: 'Brand deleted successfully' };
  }
}
