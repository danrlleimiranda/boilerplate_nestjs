import { Injectable } from '@nestjs/common';
import { CreateProductUseCase } from '../usecases/commands/CreateProductUseCase';
import { UpdateProductUseCase } from '../usecases/commands/UpdateProductUseCase';
import { DeleteProductUseCase } from '../usecases/commands/DeleteProductUseCase';
import { GetProductByIdUseCase } from '../usecases/queries/GetProductByIdUseCase';
import { GetProductsUseCase } from '../usecases/queries/GetProductsUseCase';
import { IUseCaseFactory } from '@core/factory/IUseCaseFactory';

@Injectable()
export class ProductUseCaseFactory
  implements
    IUseCaseFactory<
      CreateProductUseCase,
      UpdateProductUseCase,
      DeleteProductUseCase,
      GetProductByIdUseCase,
      GetProductsUseCase
    >
{
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly removeProductUseCase: DeleteProductUseCase,
    private readonly findProductByIdUseCase: GetProductByIdUseCase,
    private readonly getProductsUseCase: GetProductsUseCase
  ) {}

  createUseCase(): CreateProductUseCase {
    return this.createProductUseCase;
  }

  updateUseCase(): UpdateProductUseCase {
    return this.updateProductUseCase;
  }

  deleteUseCase(): DeleteProductUseCase {
    return this.removeProductUseCase;
  }

  getByIdUseCase(): GetProductByIdUseCase {
    return this.findProductByIdUseCase;
  }

  getAllUseCase(): GetProductsUseCase {
    return this.getProductsUseCase;
  }
}
