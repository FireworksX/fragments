import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MaxLength(15)
  name: string;

  @IsOptional()
  @IsString()
  logo?: string;
}
