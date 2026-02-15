import { Product } from '../product.entity';

// product-query.type.ts
export interface ProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  brandId?: string;
}

export interface PaginatedProducts {
  data: Product[];
  total: number;
  page: number;
  lastPage: number;
}
