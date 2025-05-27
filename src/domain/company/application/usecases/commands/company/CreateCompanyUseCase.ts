import { ILogger } from '@core/lib/logger/logger.interface';
import { ICompanyRepository } from '../../../repositories/ICompanyRepository';
import { IUseCase } from '@core/usecases/IUseCase';
import {
  CreateCompanyInputDto,
  CreateCompanyOutputDto,
} from '../../../types/company.types';
import { Company } from '@domain/company/enterprise/entities/Company';
import { Manager } from '@domain/company/enterprise/entities/Manager';
import { Email } from '@domain/company/enterprise/entities/value-object/Email.vo';
import { Document } from '@domain/company/enterprise/entities/value-object/Document.vo';
import { Inject } from '@nestjs/common';
import { IManagerRepository } from '@domain/company/application/repositories/IManagerRepository';

export class CreateCompanyUseCase implements IUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
    @Inject('IManagerRepository')
    private readonly managerRepository: IManagerRepository,
    @Inject('ILogger') private logger: ILogger
  ) {}
  async execute(
    data: CreateCompanyInputDto
  ): Promise<CreateCompanyOutputDto | undefined> {
    try {
      const manager = await this.managerRepository.findOne(data.managerId);
      const company = Company.create({ ...data, manager });
      await this.companyRepository.create(company);
      return {
        id: company.id.toString(),
        name: company.name,
        manager: company.manager,
        cnpj: company.cnpj,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
      };
    } catch (e) {
      const error = e as Error;
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
