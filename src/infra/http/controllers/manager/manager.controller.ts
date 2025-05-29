import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { ManagerUseCaseFacade } from '@domain/company/application/facade/ManagerUseCaseFacade';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerUseCaseFacade: ManagerUseCaseFacade) {}

  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managerUseCaseFacade.createUseCase().execute(createManagerDto);
  }

  @Get()
  findAll() {
    return this.managerUseCaseFacade.getAllUseCase().execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerUseCaseFacade.getByIdUseCase().execute({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerUseCaseFacade
      .updateUseCase()
      .execute({ ...updateManagerDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerUseCaseFacade.deleteUseCase().execute({ id });
  }
}
