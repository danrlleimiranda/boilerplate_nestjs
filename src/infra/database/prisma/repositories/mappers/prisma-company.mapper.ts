import { UniqueEntityID } from '@core/entities/UniqueEntityId';
import { Company } from '@domain/company/enterprise/entities/Company';
import { Company as PrismaCompany, Prisma } from 'prisma/generated/prisma';
export class PrismaCompanyMapper {
  static toDomain(raw: PrismaCompany) {
    return Company.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        role: raw.role,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(company: Company): Prisma.ProductUncheckedCreateInput {
    return {
      id: company.id.toString(),
      email: company.email.toString(),
      name: company.name,
      password: company.password.getValue(),
      role: company.role,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    };
  }
}
