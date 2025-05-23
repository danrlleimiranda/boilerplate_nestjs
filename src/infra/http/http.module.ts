import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CompanyUseCaseFactory } from '@domain/company/application/factory/CompanyUseCaseFactory';
import { CompanyController } from './controllers/company/company.controller';
import { ProductController } from './controllers/product/product.controller';
import { ProductUseCaseFactory } from '@domain/product/application/factory/ProductUseCaseFactory';
import { CompanyModule } from './controllers/company/company.module';

@Module({
  imports: [DatabaseModule, CompanyModule],
  controllers: [CompanyController, ProductController],
  providers: [CompanyUseCaseFactory, ProductUseCaseFactory],
})
export class HttpModule {}
