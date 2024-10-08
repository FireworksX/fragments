import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import e from 'express';
import { SupabaseService } from '../../supabase/supabase.service';
import { AuthUser } from '../interface/AuthUser';
import { UsersService } from '../../users/users.service';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy, 'supabase') {
  static key = 'supabase';
  private extractor = ExtractJwt.fromAuthHeaderAsBearerToken();

  constructor(
    private supabaseService: SupabaseService,
    private usersService: UsersService,
  ) {
    super();
  }

  async validate(payload: AuthUser): Promise<any> {
    const { data } = await this.usersService.findOneUserByEmail(payload?.email);
    return data;
  }

  async authenticate(req: e.Request) {
    const idToken = this.extractor(req);

    if (!idToken) {
      this.fail(UnauthorizedException, 401);
      return;
    }

    const authUser = await this.supabaseService.auth
      .getUser(idToken)
      .catch((err) => {
        this.fail(err.message, 401);
      });

    await this.validateSupabaseResponse(authUser);
  }

  private async validateSupabaseResponse({ data }: any) {
    const result = await this.validate(data?.user);
    if (result) {
      this.success(result, {});
      return;
    }
    this.fail(UnauthorizedException, 401);
    return;
  }
}
