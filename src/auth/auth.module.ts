import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { SupabaseStrategy } from './strategies/supabaseStrategy';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [UsersModule, SupabaseModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, SupabaseStrategy],
  exports: [AuthService, SupabaseStrategy],
})
export class AuthModule {}
