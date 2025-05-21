import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyUseCaseFactory } from '@domain/company/application/factory/CompanyUseCaseFactory';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyUseCaseFactory: CompanyUseCaseFactory) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyUseCaseFactory
      .getCreateCompanyUseCase()
      .execute(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companyUseCaseFactory.getAllCompanyUseCase().execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyUseCaseFactory.getCompanyByIdUseCase().execute({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyUseCaseFactory
      .getUpdateCompanyUseCase()
      .execute({ id, ...updateCompanyDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyUseCaseFactory.deleteCompanyUseCase().execute({ id });
  }
}
