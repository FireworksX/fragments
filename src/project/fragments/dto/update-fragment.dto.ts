import { PartialType } from '@nestjs/mapped-types';
import { CreateFragmentDto } from './create-fragment.dto';

export class UpdateFragmentDto extends PartialType(CreateFragmentDto) {}
