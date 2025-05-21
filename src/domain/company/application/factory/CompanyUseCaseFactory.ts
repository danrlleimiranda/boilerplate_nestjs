import { Injectable } from '@nestjs/common';
import { CreateCompanyUseCase } from '../usecases/commands/CreateCompanyUseCase';
import { UpdateCompanyUseCase } from '../usecases/commands/UpdateCompanyUseCase';
import { GetCompanyByIdUseCase } from '../usecases/queries/GetCompanyByIdUseCase';
import { DeleteCompanyUseCase } from '../usecases/commands/DeleteCompanyUseCase';
import { GetCompaniesUseCase } from '../usecases/queries/GetCompaniesUseCase';

@Injectable()
export class CompanyUseCaseFactory {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
    private readonly removeCompanyUseCase: DeleteCompanyUseCase,
    private readonly findCompanyByIdUseCase: GetCompanyByIdUseCase,
    private readonly getCompaniesUseCase: GetCompaniesUseCase
  ) {}

  getCreateCompanyUseCase(): CreateCompanyUseCase {
    return this.createCompanyUseCase;
  }

  getUpdateCompanyUseCase(): UpdateCompanyUseCase {
    return this.updateCompanyUseCase;
  }

  deleteCompanyUseCase(): DeleteCompanyUseCase {
    return this.removeCompanyUseCase;
  }

  getCompanyByIdUseCase(): GetCompanyByIdUseCase {
    return this.findCompanyByIdUseCase;
  }

  getAllCompanyUseCase(): GetCompaniesUseCase {
    return this.getCompaniesUseCase;
  }
}
