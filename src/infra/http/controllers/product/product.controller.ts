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
import { ProductUseCaseFactory } from '@domain/product/application/factory/ProductUseCaseFactory';

@Controller('product')
export class ProductController {
  constructor(private readonly productUseCaseFactory: ProductUseCaseFactory) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productUseCaseFactory.createUseCase().execute(createProductDto);
  }

  @Get()
  findAll() {
    return this.productUseCaseFactory.getAllUseCase();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productUseCaseFactory.getByIdUseCase().execute({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productUseCaseFactory
      .updateUseCase()
      .execute({ ...updateProductDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productUseCaseFactory.deleteUseCase().execute({ id });
  }
}
