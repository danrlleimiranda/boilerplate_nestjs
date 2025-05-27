import { IUseCase } from '@core/usecases/IUseCase';
import { IManagerRepository } from '../../../repositories/IManagerRepository';
import { ILogger } from '@core/lib/logger/logger.interface';
import { CustomError } from '@core/errors/CustomError';
import { Inject } from '@nestjs/common';
import {
  DeleteManagerInputDto,
  DeleteManagerOutputDto,
} from '@domain/company/application/types/manager.types';

export class DeleteManagerUseCase implements IUseCase {
  constructor(
    @Inject('IManagerRepository')
    private readonly managerRepository: IManagerRepository,
    @Inject('ILogger') private logger: ILogger
  ) {}
  async execute(
    data: DeleteManagerInputDto
  ): Promise<DeleteManagerOutputDto | undefined> {
    try {
      const manager = await this.managerRepository.findOne(data.id);

      if (!manager) {
        this.logger.error(
          `Manager with id ${data.id} not found`,
          new CustomError('NotFound', 404)
        );
        throw new Error(`Manager with id ${data.id} not found`);
      }
      await this.managerRepository.remove(data.id);
      return {
        id: manager.id.toString(),
        name: manager.name,
        email: manager.email.value,
        phone: manager.phone,
        createdAt: manager.createdAt,
        updatedAt: manager.updatedAt,
      };
    } catch (e) {
      const error = e as Error;
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
