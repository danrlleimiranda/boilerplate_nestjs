import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyUseCaseFacade } from '@domain/company/application/facade/CompanyUseCaseFacade';
import { HttpExceptionFilter } from '@shared/middlewares/http-exception.filter';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyUseCaseFacade: CompanyUseCaseFacade) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyUseCaseFacade.createUseCase().execute(createCompanyDto);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  findAll() {
    return this.companyUseCaseFacade.getAllUseCase().execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyUseCaseFacade.getByIdUseCase().execute({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyUseCaseFacade
      .updateUseCase()
      .execute({ id, ...updateCompanyDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyUseCaseFacade.deleteUseCase().execute({ id });
  }
}
