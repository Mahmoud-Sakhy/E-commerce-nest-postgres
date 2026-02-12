import { Module } from '@nestjs/common';
import { ProductsModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'E-Commerce',
      username: 'postgres',
      password: '28216936',
      port: 5432,
      host: 'localhost',
      synchronize: true,
      entities: [],
    }),
    ProductsModule,
  ],
})
export class AppModule {}
