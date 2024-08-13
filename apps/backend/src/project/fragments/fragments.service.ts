import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFragmentDto } from './dto/create-fragment.dto';
import { UpdateFragmentDto } from './dto/update-fragment.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { GetFragmentQueryDto } from './dto/get-fragment-query.dto';
import { omit } from '@fragments/utils';

const TABLE_NAME = 'fragments';
const PROJECT_FRAGMENTS_PIVOT = 'pivot_project_fragment';
const DEFAULT_LIMIT = 30;

@Injectable()
export class FragmentsService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createFragmentDto: CreateFragmentDto) {
    const fragmentResponse = await this.supabaseService.client
      .from(TABLE_NAME)
      .insert(omit(createFragmentDto, 'projectId'))
      .select()
      .single();

    if (fragmentResponse.error) {
      throw new HttpException(
        fragmentResponse.error.message,
        HttpStatus.BAD_GATEWAY,
      );
    }

    const pivotResponse = await this.supabaseService.client
      .from(PROJECT_FRAGMENTS_PIVOT)
      .insert({
        project: createFragmentDto.projectId,
        fragment: fragmentResponse.data.id,
      });

    if (pivotResponse.error) {
      throw new HttpException(
        pivotResponse.error.message,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return fragmentResponse;
  }

  async findAll(query: GetFragmentQueryDto) {
    const skip = query.skip ?? 0;
    const limit = skip + (query.limit ?? DEFAULT_LIMIT) - 1;
    const sortBy = query?.sortBy ?? 'activity';
    let supabaseQuery = this.supabaseService.client
      .from(TABLE_NAME)
      .select(`*, author(*)`);

    if ('search' in query) {
      supabaseQuery = supabaseQuery.textSearch('name', query.search);
    }
    supabaseQuery.order(sortBy === 'activity' ? 'updated_at' : 'name');

    supabaseQuery = supabaseQuery.range(skip, limit);
    return await supabaseQuery;
  }

  async findOne(id: number) {
    return await this.supabaseService.client
      .from(TABLE_NAME)
      .select(`*, author(*)`)
      .eq('id', id);
  }

  update(id: number, updateFragmentDto: UpdateFragmentDto) {
    return `This action updates a #${id} fragment`;
  }

  remove(id: number) {
    return `This action removes a #${id} fragment`;
  }
}
