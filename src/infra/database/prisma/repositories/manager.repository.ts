import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IManagerRepository } from '@domain/company/application/repositories/IManagerRepository';
import { PrismaManagerMapper } from './mappers/prisma-manager.mapper';
import { Manager } from '@domain/company/enterprise/entities/Manager';
import { CustomError } from '@core/errors/CustomError';

@Injectable()
export class ManagerRepository implements IManagerRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Manager): Promise<Manager> {
    const manager = PrismaManagerMapper.toPrisma(data);
    await this.prisma.manager.create({ data: manager });
    return data;
  }
  async save(data: Manager): Promise<Manager> {
    const manager = PrismaManagerMapper.toPrisma(data);
    this.prisma.manager.update({
      where: { id: manager.id },
      data: manager,
    });

    return data;
  }
  async findAll(): Promise<Manager[]> {
    const managers = await this.prisma.manager.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        cpf: true,
        createdAt: true,
        updatedAt: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
          },
        },
      },
    });

    console.log(managers);

    return managers.map((manager) => PrismaManagerMapper.toDomain(manager));
  }
  async findOne(id: string): Promise<Manager> {
    const manager = await this.prisma.manager.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
          },
        },
      },
    });
    if (!manager) {
      throw new CustomError('Manager not found', 404);
    }
    return PrismaManagerMapper.toDomain(manager);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.manager.delete({
      where: { id },
    });
  }
}
