import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CreateCompanyUseCase } from '@domain/company/application/usecases/commands/CreateCompanyUseCase';
import { DeleteCompanyUseCase } from '@domain/company/application/usecases/commands/DeleteCompanyUseCase';
import { UpdateCompanyUseCase } from '@domain/company/application/usecases/commands/UpdateCompanyUseCase';
import { GetCompaniesUseCase } from '@domain/company/application/usecases/queries/GetCompaniesUseCase';
import { GetCompanyByIdUseCase } from '@domain/company/application/usecases/queries/GetCompanyByIdUseCase';
import { ProductUseCaseFactory } from '@domain/product/application/factory/ProductUseCaseFactory';
import { DatabaseModule } from '@infra/database/database.module';

const usecases = [
  CreateCompanyUseCase,
  UpdateCompanyUseCase,
  DeleteCompanyUseCase,
  GetCompanyByIdUseCase,
  GetCompaniesUseCase,
];

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [...usecases],
  exports: [...usecases],
})
export class CompanyModule {}
