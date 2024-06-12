import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import e from 'express';
import { SupabaseService } from '../../supabase/supabase.service';
import { AuthUser } from '../interface/AuthUser';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy, 'supabase') {
  static key = 'supabase';
  private extractor = ExtractJwt.fromAuthHeaderAsBearerToken();

  constructor(private supabaseService: SupabaseService) {
    super();
  }

  async validate(payload: AuthUser): Promise<AuthUser> {
    return payload;
  }

  async authenticate(req: e.Request) {
    const idToken = this.extractor(req);

    if (!idToken) {
      this.fail(UnauthorizedException, 401);
      return;
    }

    this.supabaseService.auth
      .getUser(idToken)
      .then((res) => this.validateSupabaseResponse(res))
      .catch((err) => {
        this.fail(err.message, 401);
      });
  }

  private async validateSupabaseResponse({ data }: any) {
    const result = await this.validate(data);
    if (result) {
      this.success(result, {});
      return;
    }
    this.fail(UnauthorizedException, 401);
    return;
  }
}
