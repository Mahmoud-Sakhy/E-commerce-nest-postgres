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
      entities: [Product, Category, User, Admin, Session],
    }),
    ProductsModule,
    CategoryModule,
    UsersModule,
    AdminModule,
    SessionModule,
  ],
})
export class AppModule {}
