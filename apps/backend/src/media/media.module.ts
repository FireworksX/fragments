import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
