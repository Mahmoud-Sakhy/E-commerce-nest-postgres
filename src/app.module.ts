import { Module } from '@nestjs/common';
import { ProductsModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/product.entity';
import { Category } from './category/category.entity';
import { User } from './users/user.entity';
import { Admin } from './admin/entities/admin.entity';
import { Session } from './session/entities/session.entity';
import { CategoryModule } from './category/category.module';
import { UsersModule } from './users/user.module';
import { AdminModule } from './admin/admin.module';
import { SessionModule } from './session/session.module';
import { Brand } from './brand/brand.entity';
import { CartItem } from './cart/cart-item.entity';
import { OrderItem } from './order/order-item.entity';
import { Wishlist } from './wishlist/wishlist.entity';
import { BrandModule } from './brand/brand.module';
import { Cart } from './cart/cart.entity';
import { Order } from './order/order.entity';
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
      entities: [
        Product,
        Brand,
        Category,
        User,
        Admin,
        Session,
        Cart,
        CartItem,
        Order,
        OrderItem,
        Wishlist,
      ],
    }),
    ProductsModule,
    CategoryModule,
    UsersModule,
    AdminModule,
    SessionModule,
    BrandModule,
  ],
})
export class AppModule {}
