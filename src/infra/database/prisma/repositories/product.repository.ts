import { IProductRepository } from '@domain/product/application/repositories/IProductRepository';
import { Product } from '@domain/product/enterprise/entities/Product';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository implements IProductRepository {
  create(data: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  save(data: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
