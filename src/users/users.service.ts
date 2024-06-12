import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SupabaseAuthGuard } from '../auth/auth.guard';

const TABLE_NAME = 'users';

export interface User {}

@UseGuards(SupabaseAuthGuard)
@Injectable()
export class UsersService {
  constructor(private supabaseService: SupabaseService) {}

  async createUser(user: CreateUserDto) {
    const { data, error } = await this.supabaseService.client
      .from(TABLE_NAME)
      .insert(user)
      .select()
      .single();

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }

    return data;
  }

  async findOne(id: number) {
    const { data, error } = await this.supabaseService.client
      .from(TABLE_NAME)
      .select()
      .eq('id', id)
      .single();

    if (error) {
      throw new HttpException('Not found', HttpStatus.NOT_ACCEPTABLE);
    }

    return data;
  }

  async findOneUserByEmail(email: string) {
    return await this.supabaseService.client
      .from(TABLE_NAME)
      .select()
      .eq('email', email)
      .single();
  }
}
