import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOptionsWhere,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { PaginatedProducts } from './types/product-query.type';

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

  async findAll(query: ProductQueryDto): Promise<PaginatedProducts> {
    const {
      page = 1,
      limit = 10,
      search,
      categoryId,
      brandId,
      sort = 'createdAt',
      order = 'desc',
      minPrice,
      maxPrice,
    } = query;

    const where: FindOptionsWhere<Product> = {};

    /* ===== Search ===== */
    if (search) {
      where.title = ILike(`%${search}%`);
    }

    /* ===== Filters ===== */
    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (brandId) {
      where.brandId = brandId;
    }

    /* ===== Price Range ===== */
    if (minPrice !== undefined && maxPrice !== undefined) {
      where.price = Between(minPrice, maxPrice);
    } else if (minPrice !== undefined) {
      where.price = MoreThanOrEqual(minPrice);
    } else if (maxPrice !== undefined) {
      where.price = LessThanOrEqual(maxPrice);
    }

    /* ===== Sorting ===== */
    const orderBy: Record<string, 'ASC' | 'DESC'> = {
      [sort]: order.toUpperCase() as 'ASC' | 'DESC',
    };

    const [data, total] = await this.productRepo.findAndCount({
      where,
      relations: ['category', 'brand'],
      skip: (page - 1) * limit,
      take: limit,
      order: orderBy,
    });

    return {
      data,
      total,
      page,
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
