import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { AuthUser } from '../auth/interface/AuthUser';

const TABLE_NAME = 'projects';
const MEMBERS_TABLE_NAME = 'pivot_project_member';

@Injectable()
export class ProjectService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createProjectDto: CreateProjectDto, ownerId: number) {
    const projectResponse = await this.supabaseService.client
      .from(TABLE_NAME)
      .insert({ ...createProjectDto, owner: ownerId })
      .select()
      .single();

    if (projectResponse.error) {
      throw new HttpException(
        projectResponse.error.message,
        HttpStatus.BAD_GATEWAY,
      );
    }

    const pivotResponse = await this.supabaseService.client
      .from(MEMBERS_TABLE_NAME)
      .insert({ member: ownerId, project: projectResponse.data.id });

    if (pivotResponse.error) {
      throw new HttpException(
        pivotResponse.error.message,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return projectResponse.data;
  }

  findAll() {
    return `This action returns all project`;
  }

  async findOne(id: number) {
    const { data, error } = await this.supabaseService.client
      .from(TABLE_NAME)
      .select(`*, owner(*)`)
      .eq('id', id)
      .single();

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }

    return data;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }

  async getMembers(projectId: number) {
    const pivotResponse = await this.supabaseService.client
      .from(MEMBERS_TABLE_NAME)
      .select(`member(*)`)
      .eq('project', projectId);

    if (pivotResponse.error) {
      throw new HttpException(
        pivotResponse.error.message,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return pivotResponse.data.map((el) => el.member);
  }

  async getFragments(projectId: number) {
    const pivotResponse = await this.supabaseService.client
      .from(MEMBERS_TABLE_NAME)
      .select(`member(*)`)
      .eq('project', projectId);

    if (pivotResponse.error) {
      throw new HttpException(
        pivotResponse.error.message,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return pivotResponse.data.map((el) => el.member);
  }
}
