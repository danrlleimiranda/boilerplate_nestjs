import { IsString, IsNotEmpty } from 'class-validator';
import { CreateManagerDto, ManagerDto } from './manager.dto';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;

  managerId: string;
}
