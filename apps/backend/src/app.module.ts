import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { SupabaseService } from 'src/supabase/supabase.service';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { ProjectModule } from 'src/project/project.module';
import { FragmentsModule } from 'src/project/fragments/fragments.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MediaModule,
    AuthModule,
    UsersModule,
    SupabaseModule,
    ProjectModule,
    FragmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
