import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ManagerDto } from './manager.dto';

export class CompanyDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
  manager: ManagerDto;
  @IsString()
  cnpj: string;
}
