import { CreateProductUseCase } from '@domain/product/application/usecases/commands/CreateProductUseCase';
import { DeleteProductUseCase } from '@domain/product/application/usecases/commands/DeleteProductUseCase';
import { UpdateProductUseCase } from '@domain/product/application/usecases/commands/UpdateProductUseCase';
import { GetProductByIdUseCase } from '@domain/product/application/usecases/queries/GetProductByIdUseCase';
import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { GetProductsUseCase } from '@domain/product/application/usecases/queries/GetProductsUseCase';
import { ProductUseCaseFactory } from '@domain/product/application/factory/ProductUseCaseFactory';

const usecases = [
  CreateProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
  GetProductByIdUseCase,
  GetProductsUseCase,
];

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [...usecases, ProductUseCaseFactory],
  exports: [...usecases, ProductUseCaseFactory],
})
export class ProductModule {}
