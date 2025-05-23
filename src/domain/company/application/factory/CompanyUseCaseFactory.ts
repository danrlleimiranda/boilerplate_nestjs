import { Injectable } from '@nestjs/common';
import { CreateCompanyUseCase } from '../usecases/commands/CreateCompanyUseCase';
import { UpdateCompanyUseCase } from '../usecases/commands/UpdateCompanyUseCase';
import { GetCompanyByIdUseCase } from '../usecases/queries/GetCompanyByIdUseCase';
import { DeleteCompanyUseCase } from '../usecases/commands/DeleteCompanyUseCase';
import { GetCompaniesUseCase } from '../usecases/queries/GetCompaniesUseCase';
import { IUseCaseFactory } from '@core/factory/IUseCaseFactory';

@Injectable()
export class CompanyUseCaseFactory
  implements
    IUseCaseFactory<
      CreateCompanyUseCase,
      UpdateCompanyUseCase,
      DeleteCompanyUseCase,
      GetCompanyByIdUseCase,
      GetCompaniesUseCase
    >
{
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
    private readonly findCompanyByIdUseCase: GetCompanyByIdUseCase,
    private readonly getCompaniesUseCase: GetCompaniesUseCase
  ) {}

  createUseCase() {
    return this.createCompanyUseCase;
  }

  updateUseCase() {
    return this.updateCompanyUseCase;
  }

  deleteUseCase() {
    return this.deleteCompanyUseCase;
  }

  getByIdUseCase() {
    return this.findCompanyByIdUseCase;
  }

  getAllUseCase() {
    return this.getCompaniesUseCase;
  }
}
