import { Controller, Get } from '@nestjs/common';

@Controller()
export class ProductsController {
  createNewProduct() {
    return {};
  }

  @Get('/api/products')
  getAllProducts() {
    return [];
  }
}
