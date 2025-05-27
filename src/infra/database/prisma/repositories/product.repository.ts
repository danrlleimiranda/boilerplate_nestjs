import { IProductRepository } from '@domain/company/subdomain/product/application/repositories/IProductRepository';
import { Product } from '@domain/company/subdomain/product/enterprise/entities/Product';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaProductMapper } from './mappers/prisma-product.mapper';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Product): Promise<Product> {
    const product = PrismaProductMapper.toPrisma(data);

    await this.prisma.product.create({ data: product });
    return data;
  }

  async save(data: Product): Promise<Product> {
    const product = PrismaProductMapper.toPrisma(data);
    await this.prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    return data;
  }
  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: {
        company: {
          select: {
            id: true,
            name: true,
            manager: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return products.map((product) => PrismaProductMapper.toDomain(product));
  }
  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            manager: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    if (!product) {
      throw new Error('Product not found');
    }
    return PrismaProductMapper.toDomain(product);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }
}
