import { IsInt, IsString } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  path: string;

  @IsString()
  name: string;

  @IsString()
  ext: string;

  @IsInt()
  user: number;
}
