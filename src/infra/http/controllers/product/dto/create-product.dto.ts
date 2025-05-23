import { CompanyDto } from '@domain/company/application/types/company.types';

export class CreateProductDto {
  name: string;
  description?: string;
  price: number;
  companyId: string;
}
