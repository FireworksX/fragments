import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SupabaseAuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { AuthUser } from './interface/AuthUser';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signUp')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body.email, body.password, {
      first_name: body.first_name,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('signOut')
  async signOut() {
    const error = await this.authService.signOut();
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }

    return {
      error,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(SupabaseAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: AuthUser) {
    return user;
  }
}
