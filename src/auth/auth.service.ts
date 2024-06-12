import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { AuthError } from '@supabase/supabase-js';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private supabase: SupabaseService,
    private usersService: UsersService,
  ) {}

  async login(username: string, pass: string): Promise<any> {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email: username,
      password: pass,
    });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }

    return data;
  }

  async signIn(
    email: string,
    password: string,
    meta: { first_name: string },
  ): Promise<any> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: meta.first_name,
        },
      },
    });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }

    const createdUser = await this.usersService.createUser({
      email,
      first_name: meta.first_name,
      last_name: null,
    });

    return {
      user: createdUser,
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    };
  }

  async signOut(): Promise<AuthError> {
    const { error } = await this.supabase.client.auth.signOut();

    return error;
  }
}
