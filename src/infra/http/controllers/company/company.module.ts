import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CreateCompanyUseCase } from '@domain/company/application/usecases/commands/CreateCompanyUseCase';
import { DeleteCompanyUseCase } from '@domain/company/application/usecases/commands/DeleteCompanyUseCase';
import { UpdateCompanyUseCase } from '@domain/company/application/usecases/commands/UpdateCompanyUseCase';
import { GetCompaniesUseCase } from '@domain/company/application/usecases/queries/GetCompaniesUseCase';
import { GetCompanyByIdUseCase } from '@domain/company/application/usecases/queries/GetCompanyByIdUseCase';
import { CompanyUseCaseFactory } from '@domain/company/application/factory/CompanyUseCaseFactory';
import { LoggerModule } from '@shared/logger/logger.module';
import { DatabaseModule } from '@infra/database/database.module';
import { CompanyRepository } from '@infra/database/prisma/repositories/company.repository';

const usecases = [
  CreateCompanyUseCase,
  UpdateCompanyUseCase,
  DeleteCompanyUseCase,
  GetCompanyByIdUseCase,
  GetCompaniesUseCase,
];

@Module({
  imports: [LoggerModule, DatabaseModule],
  controllers: [CompanyController],
  providers: [
    ...usecases,
    CompanyUseCaseFactory,
    {
      provide: 'ICompanyRepository',
      useClass: CompanyRepository,
    },
  ],
  exports: [...usecases, CompanyUseCaseFactory],
})
export class CompanyModule {}
