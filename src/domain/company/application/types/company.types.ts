import { Manager } from '@domain/company/enterprise/entities/Manager';

export type CompanyDto = {
  id: string;
  name: string;
  cnpj: string;
  manager: {
    id: string;
    name: string;
    email: string;
    phone: string;
    cpf: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateCompanyInputDto = Omit<
  CompanyDto,
  'id' | 'createdAt' | 'updatedAt'
>;

export type CreateCompanyOutputDto = {
  id: string;
  name: string;
  cnpj: string;
  manager: Manager;
  createdAt: Date;
  updatedAt: Date;
};

export type GetCompanyByIdInputDto = {
  id: string;
};

export type GetCompanyByIdOutputDto = {
  id: string;
  name: string;
  cnpj: string;
  manager: Manager;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateCompanyInputDto = Partial<CompanyDto>;
export type UpdateCompanyOutputDto = CreateCompanyOutputDto;

export type DeleteCompanyInputDto = {
  id: string;
};

export type DeleteCompanyOutputDto = {
  id: string;
  name: string;
  cnpj: string;
  manager: Manager;
  createdAt: Date;
  updatedAt: Date;
};

export type GetAllCompaniesOutputDto = {
  id: string;
  name: string;
  cnpj: string;
  manager: Manager;
  createdAt: Date;
  updatedAt: Date;
}[];
