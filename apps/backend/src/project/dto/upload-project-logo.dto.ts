import { IsInt, IsString, MaxLength } from 'class-validator';
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class UploadProjectLogoDto {
  @IsFile()
  @HasMimeType(['image/png', 'image/jpg', 'image/jpeg', 'image/gif'])
  file: MemoryStoredFile;

  @IsInt()
  userId: number;
}
