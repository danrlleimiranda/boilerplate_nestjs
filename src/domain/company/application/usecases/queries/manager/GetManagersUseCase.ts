import { IUseCase } from '@core/usecases/IUseCase';
import { IManagerRepository } from '../../../repositories/IManagerRepository';
import { ILogger } from '@core/lib/logger/logger.interface';
import { CustomError } from '@core/errors/CustomError';
import { GetAllManagersOutputDto } from '../../../types/manager.types';
import { Inject } from '@nestjs/common';

export class GetManagersUseCase implements IUseCase {
  constructor(
    @Inject('IManagerRepository')
    private readonly managerRepository: IManagerRepository,
    @Inject('ILogger') private logger: ILogger
  ) {}
  async execute(): Promise<GetAllManagersOutputDto | undefined> {
    try {
      const companies = await this.managerRepository.findAll();

      if (!companies || companies.length === 0) {
        this.logger.error(
          `No companies found`,
          new CustomError('NotFound', 404)
        );
        throw new Error(`No companies found`);
      }
      return companies.map((manager) => ({
        id: manager.id.toString(),
        name: manager.name,
        email: manager.email.value,
        phone: manager.phone,
        createdAt: manager.createdAt,
        updatedAt: manager.updatedAt,
      }));
    } catch (e) {
      const error = e as Error;
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
