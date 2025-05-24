import { CreateProductUseCase } from '@domain/product/application/usecases/commands/CreateProductUseCase';
import { DeleteProductUseCase } from '@domain/product/application/usecases/commands/DeleteProductUseCase';
import { UpdateProductUseCase } from '@domain/product/application/usecases/commands/UpdateProductUseCase';
import { GetProductByIdUseCase } from '@domain/product/application/usecases/queries/GetProductByIdUseCase';
import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { GetProductsUseCase } from '@domain/product/application/usecases/queries/GetProductsUseCase';
import { ProductUseCaseFactory } from '@domain/product/application/factory/ProductUseCaseFactory';
import { ProductRepository } from '@infra/database/prisma/repositories/product.repository';
import { CompanyRepository } from '@infra/database/prisma/repositories/company.repository';
import { DatabaseModule } from '@infra/database/database.module';
import { LoggerModule } from '@shared/logger/logger.module';

const usecases = [
  CreateProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
  GetProductByIdUseCase,
  GetProductsUseCase,
];

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [ProductController],
  providers: [
    ...usecases,
    ProductUseCaseFactory,
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
    {
      provide: 'ICompanyRepository',
      useClass: CompanyRepository,
    },
  ],
  exports: [...usecases, ProductUseCaseFactory],
})
export class ProductModule {}
