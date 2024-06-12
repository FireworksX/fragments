import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreateFragmentDto {
  @IsString()
  name: string;

  @IsUUID()
  author: string;
}
