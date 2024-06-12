import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  Query,
  UsePipes,
  ValidationPipe,
  HttpException,
} from '@nestjs/common';
import { FragmentsService } from './fragments.service';
import { UpdateFragmentDto } from './dto/update-fragment.dto';
import { CreateFragmentControllerDto } from './dto/create-fragment-controller.dto';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { AuthUser } from 'src/auth/interface/AuthUser';
import { SupabaseAuthGuard } from 'src/auth/auth.guard';
import { GetFragmentQueryDto } from './dto/get-fragment-query.dto';

@UseGuards(SupabaseAuthGuard)
@Controller('project/:id/fragments')
export class FragmentsController {
  constructor(private readonly fragmentsService: FragmentsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @Body() createFragmentDto: CreateFragmentControllerDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.fragmentsService.create({
      ...createFragmentDto,
      author: user.id,
    });
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() query: GetFragmentQueryDto) {
    const fragments = await this.fragmentsService.findAll(query);

    if (fragments.error) {
      throw new HttpException(fragments.error.message, HttpStatus.BAD_GATEWAY);
    }

    return fragments.data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fragmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFragmentDto: UpdateFragmentDto,
  ) {
    return this.fragmentsService.update(+id, updateFragmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fragmentsService.remove(+id);
  }
}
