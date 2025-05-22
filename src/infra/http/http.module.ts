import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CompanyUseCaseFactory } from '@domain/company/application/factory/CompanyUseCaseFactory';
import { CompanyController } from './controllers/company/company.controller';
import { ProductController } from './controllers/product/product.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CompanyController, ProductController],
  providers: [CompanyUseCaseFactory],
})
export class HttpModule {}
