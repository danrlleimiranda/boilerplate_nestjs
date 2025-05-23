import { IUseCase } from '@core/usecases/IUseCase';
import { ILogger } from '@infra/logger/logger.interface';
import { CustomError } from '@core/errors/CustomError';
import {
  DeleteProductInputDto,
  DeleteProductOutputDto,
} from '../../types/product.types';
import { IProductRepository } from '../../repositories/IProductRepository';

export class DeleteProductUseCase implements IUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private logger: ILogger
  ) {}
  async execute(
    data: DeleteProductInputDto
  ): Promise<DeleteProductOutputDto | undefined> {
    try {
      const product = await this.productRepository.findOne(data.id);

      if (!product) {
        this.logger.error(
          `Product with id ${data.id} not found`,
          new CustomError('NotFound', 404)
        );
        throw new Error(`Product with id ${data.id} not found`);
      }
      await this.productRepository.remove(data.id);
      return {
        id: product.id.toString(),
      };
    } catch (e) {
      const error = e as Error;
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
