import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { SupabaseAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { AuthUser } from '../auth/interface/AuthUser';
import { UsersService } from '../users/users.service';

@UseGuards(SupabaseAuthGuard)
@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUser() authUser: AuthUser,
  ) {
    const { data: owner, error } = await this.usersService.findOneUserByEmail(
      authUser.email,
    );
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }

    return this.projectService.create(createProjectDto, owner.id);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }

  @Get(':id/members')
  findMembers(@Param('id') id: string) {
    return this.projectService.getMembers(+id);
  }
}
