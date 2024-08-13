import { IsInt, IsString } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { CreateFragmentDto } from './create-fragment.dto';

export class CreateFragmentControllerDto extends PickType(CreateFragmentDto, [
  'name',
]) {}
