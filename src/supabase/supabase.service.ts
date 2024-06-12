import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as process from 'process';

@Injectable()
export class SupabaseService {
  public client: SupabaseClient;
  public auth: SupabaseClient['auth'];

  constructor() {
    this.client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      {
        auth: {
          autoRefreshToken: true,
        },
      },
    );

    this.auth = this.client.auth;
  }
}
