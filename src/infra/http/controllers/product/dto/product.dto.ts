import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { CompanyDto } from '../../company/dto/company.dto';

export class ProductDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description?: string;
  @IsNumber()
  price: number;
  company: CompanyDto;
}
