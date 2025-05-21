import { Company } from '@domain/company/enterprise/entities/Company';

export interface ICompanyRepository {
  create(data: Company): Promise<Company>;
  save(data: Company): Promise<Company>;
  findAll(): Promise<Company[]>;
  findOne(id: string): Promise<Company>;
  update(id: string, data: Company): Promise<Company>;
  remove(id: string): Promise<void>;
}
