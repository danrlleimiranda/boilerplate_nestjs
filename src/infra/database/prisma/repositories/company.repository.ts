import { ICompanyRepository } from '@domain/company/application/repositories/ICompanyRepository';
import { Company } from '@domain/company/enterprise/entities/Company';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaCompanyMapper } from './mappers/prisma-company.mapper';
import { CustomError } from '@core/errors/CustomError';

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Company): Promise<Company> {
    const company = PrismaCompanyMapper.toPrisma(data);
    await this.prisma.company.create({ data: company });
    return data;
  }
  async save(data: Company): Promise<Company> {
    const company = PrismaCompanyMapper.toPrisma(data);
    this.prisma.company.update({
      where: { id: company.id },
      data: company,
    });

    return data;
  }
  async findAll(): Promise<Company[]> {
    const companies = await this.prisma.company.findMany({
      select: {
        id: true,
        name: true,
        cnpj: true,
        manager: true,
        createdAt: true,
        updatedAt: true,
        managerId: true,
      },
    });
    return companies.map((company) => PrismaCompanyMapper.toDomain(company));
  }
  async findOne(id: string): Promise<Company> {
    const company = await this.prisma.company.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        cnpj: true,
        manager: true,
        createdAt: true,
        updatedAt: true,
        managerId: true,
      },
    });
    if (!company) {
      throw new CustomError('Company not found', 404);
    }
    return PrismaCompanyMapper.toDomain(company);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.company.delete({
      where: { id },
    });
  }
}
