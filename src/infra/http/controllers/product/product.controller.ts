import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductUseCaseFacade } from '@domain/company/subdomain/product/application/facade/ProductUseCaseFacade';

@Controller('product')
export class ProductController {
  constructor(private readonly productUseCaseFacade: ProductUseCaseFacade) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productUseCaseFacade.createUseCase().execute(createProductDto);
  }

  @Get()
  findAll() {
    return this.productUseCaseFacade.getAllUseCase().execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productUseCaseFacade.getByIdUseCase().execute({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productUseCaseFacade
      .updateUseCase()
      .execute({ ...updateProductDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productUseCaseFacade.deleteUseCase().execute({ id });
  }
}
