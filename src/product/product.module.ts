import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { ProductListener } from './listeners/product.listerner';
import { Product } from './product';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    SharedModule
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductListener],
  exports: [ProductService]
})
export class ProductModule { }
