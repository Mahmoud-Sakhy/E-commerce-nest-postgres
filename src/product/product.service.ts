import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    const product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  async findAll(query: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { page = 1, limit = 10, search, categoryId, brandId } = query;

    const where: any = {};

    if (search) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      where.title = ILike(`%${search}%`);
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (brandId) {
      where.brandId = brandId;
    }

    const [data, total] = await this.productRepo.findAndCount({
      where,
      relations: ['category', 'brand'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page: +page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOneBySlug(slug: string) {
    const product = await this.productRepo.findOne({
      where: { slug },
      relations: ['category', 'brand'],
    });

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');

    Object.assign(product, dto);
    return this.productRepo.save(product);
  }

  async remove(id: string) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');

    await this.productRepo.remove(product);
    return { message: 'Product deleted successfully' };
  }
}
