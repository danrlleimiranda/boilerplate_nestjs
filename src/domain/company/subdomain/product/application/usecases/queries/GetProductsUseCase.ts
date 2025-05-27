import { IUseCase } from '@core/usecases/IUseCase';
import { IProductRepository } from '../../repositories/IProductRepository';
import { ILogger } from '@core/lib/logger/logger.interface';
import { CustomError } from '@core/errors/CustomError';
import { GetAllProductsOutputDto } from '../../types/product.types';
import { Product } from '@domain/company/subdomain/product/enterprise/entities/Product';

export class GetProductsUseCase implements IUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private logger: ILogger
  ) {}
  async execute(): Promise<GetAllProductsOutputDto | undefined> {
    try {
      const products = await this.productRepository.findAll();

      if (!products || products.length === 0) {
        this.logger.error(
          `No products found`,
          new CustomError('NotFound', 404)
        );
        throw new Error(`No products found`);
      }
      return products.map((product: Product) => ({
        id: product.id.toString(),
        name: product.name,
        company: product.company,
        description: product.description,
        price: product.price,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }));
    } catch (e) {
      const error = e as Error;
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
