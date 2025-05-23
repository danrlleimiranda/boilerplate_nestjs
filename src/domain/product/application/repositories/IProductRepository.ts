import { Product } from '@domain/product/enterprise/entities/Product';

export interface IProductRepository {
  create(data: Product): Promise<Product>;
  save(data: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findOne(id: string): Promise<Product>;
  update(id: string, data: Product): Promise<Product>;
  remove(id: string): Promise<void>;
}
