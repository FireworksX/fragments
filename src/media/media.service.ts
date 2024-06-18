import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateMediaDto } from './dto/create-media.dto';

const TABLE_NAME = 'media';

@Injectable()
export class MediaService {
  constructor(private supabaseService: SupabaseService) {}

  async createMedia(bucketName: string, media: CreateMediaDto) {
    const publicPath = await this.getPublicUrl(bucketName, media.path);
    return this.supabaseService.client
      .from(TABLE_NAME)
      .insert({
        ...media,
        public_path: publicPath.data.publicUrl,
      })
      .select()
      .single();
  }

  async getPublicUrl(bucketName: string, path: string) {
    return this.supabaseService.storage.from(bucketName).getPublicUrl(path);
  }
}
