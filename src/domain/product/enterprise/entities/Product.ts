import { Entity } from '@core/entities/Entity';
import { Company } from '@domain/company/enterprise/entities/Company';

type ProductProps = {
  id: string;
  name: string;
  description?: string;
  price: number;
  company: Company;
  createdAt: Date;
  updatedAt?: Date;
};
export class Product extends Entity<ProductProps> {}
