import { ICompanyRepository } from '@domain/company/application/repositories/ICompanyRepository';
import { Company } from '@domain/company/enterprise/entities/Company';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  create(data: Company): Promise<Company> {
    throw new Error('Method not implemented.');
  }
  save(data: Company): Promise<Company> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Company[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<Company> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Company): Promise<Company> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
