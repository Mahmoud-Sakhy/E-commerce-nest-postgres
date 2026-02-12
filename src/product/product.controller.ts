import { Controller, Get } from '@nestjs/common';

@Controller()
export class ProductsController {
  createNewProduct() {
    return {};
  }

  @Get('/api/products')
  getAllProducts() {
    return [
      {
        id: 1,
        title: 'Product 1',
        price: 100,
      },
      {
        id: 2,
        title: 'Product 2',
        price: 200,
      },
      {
        id: 3,
        title: 'Product 3',
        price: 300,
      },
    ];
  }
}
