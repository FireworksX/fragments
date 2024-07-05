import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { AuthUser } from '../auth/interface/AuthUser';
import { UploadProjectLogoDto } from './dto/upload-project-logo.dto';
import { MediaService } from '../media/media.service';
import { generateUuid } from '../utils/uuid';

const TABLE_NAME = 'projects';
const MEMBERS_TABLE_NAME = 'pivot_project_member';
const PROJECT_BUCKET = 'project';
const LOGOS_FOLDER = 'logos';
const ASSETS_FOLDER = 'assets';

@Injectable()
export class ProjectService {
  constructor(
    private supabaseService: SupabaseService,
    private mediaService: MediaService,
  ) {}

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

  async findAll(user: AuthUser) {
    if (!user) {
      throw new HttpException('Auth user not found.', HttpStatus.FORBIDDEN);
    }

    const { data, error } = await this.supabaseService.client
      .from(TABLE_NAME)
      .select(`*, owner(*), logo(id, public_path)`)
      .not('owner', 'is', null)
      .eq('owner.id', user.id);

    if (!data.length) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }

    return data;
  }

  async findOne(id: number, user: AuthUser) {
    if (!user) {
      throw new HttpException('Auth user not found.', HttpStatus.FORBIDDEN);
    }

    const { data, error } = await this.supabaseService.client
      .from(TABLE_NAME)
      .select(`*, owner(*), logo(id, public_path)`)
      .not('owner', 'is', null)
      .eq('id', id)
      .eq('owner.id', user.id)
      .single();

    if (!data) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

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

  async uploadLogo(uploadLogo: UploadProjectLogoDto) {
    const fileName = uploadLogo.file.originalName;
    const filePath = `${LOGOS_FOLDER}/${generateUuid()}.${uploadLogo.file.extension}`;
    const { error } = await this.supabaseService.storage
      .from(PROJECT_BUCKET)
      .upload(filePath, uploadLogo.file.buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: uploadLogo.file.mimeType,
      });

    if (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const mediaResponse = await this.mediaService.createMedia(PROJECT_BUCKET, {
      path: filePath,
      name: fileName,
      ext: uploadLogo.file?.extension,
      user: uploadLogo.userId,
    });

    if (mediaResponse.error) {
      throw new HttpException(
        mediaResponse.error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      url: mediaResponse.data.public_path,
      id: mediaResponse.data.id,
    };
  }

  async uploadAssets(uploadAssets: UploadProjectLogoDto) {
    const fileName = uploadAssets.file.originalName;
    const filePath = `${ASSETS_FOLDER}/${generateUuid()}.${uploadAssets.file.extension}`;
    const { error } = await this.supabaseService.storage
      .from(PROJECT_BUCKET)
      .upload(filePath, uploadAssets.file.buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: uploadAssets.file.mimeType,
      });

    if (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const mediaResponse = await this.mediaService.createMedia(PROJECT_BUCKET, {
      path: filePath,
      name: fileName,
      ext: uploadAssets.file?.extension,
      user: uploadAssets.userId,
    });

    if (mediaResponse.error) {
      throw new HttpException(
        mediaResponse.error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      url: mediaResponse.data.public_path,
      id: mediaResponse.data.id,
    };
  }
}
