import { IsString, MaxLength } from 'class-validator';
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';
import { PickType } from '@nestjs/mapped-types';
import { UploadProjectLogoDto } from './upload-project-logo.dto';

export class UploadProjectLogoControllerDto extends PickType(
  UploadProjectLogoDto,
  ['file'],
) {}
