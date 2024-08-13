import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreateFragmentDto {
  @IsString()
  name: string;

  @IsInt()
  author: number;

  @IsInt()
  projectId: number;
}
