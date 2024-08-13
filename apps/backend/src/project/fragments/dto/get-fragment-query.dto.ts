import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetFragmentQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => +value)
  skip?: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => +value)
  limit?: number;

  @IsOptional()
  @IsEnum(['activity', 'name'])
  sortBy?: 'activity' | 'name';
}
