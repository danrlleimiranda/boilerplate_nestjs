import { IUseCase } from '@core/usecases/IUseCase';
import { ICompanyRepository } from '../../repositories/ICompanyRepository';
import { ILogger } from '@infra/logger/logger.interface';
import { CustomError } from '@core/errors/CustomError';
import {
  GetAllCompaniesOutputDto,
  GetCompanyByIdInputDto,
  GetCompanyByIdOutputDto,
} from '../../types/company.types';

export class GetCompaniesUseCase implements IUseCase {
  constructor(
    private readonly companyRepository: ICompanyRepository,
    private logger: ILogger
  ) {}
  async execute(): Promise<GetAllCompaniesOutputDto | undefined> {
    try {
      const companies = await this.companyRepository.findAll();

      if (!companies || companies.length === 0) {
        this.logger.error(
          `No companies found`,
          new CustomError('NotFound', 404)
        );
        throw new Error(`No companies found`);
      }
      return companies.map((company) => ({
        id: company.id.toString(),
        name: company.name,
        manager: company.manager,
        cnpj: company.cnpj,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
      }));
    } catch (e) {
      const error = e as Error;
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
