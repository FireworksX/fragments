import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { SupabaseModule } from '../supabase/supabase.module';
import { UsersModule } from '../users/users.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [NestjsFormDataModule, SupabaseModule, UsersModule, MediaModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
