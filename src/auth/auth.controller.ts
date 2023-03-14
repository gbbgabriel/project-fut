import { Body, Controller, Post } from '@nestjs/common';
import { AdmService } from 'src/adm/adm.service';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly admService: AdmService) {}
  @Post('login')
  async login(@Body() authLoginDTO: AuthLoginDTO) {}

  @Post('register')
  async register(@Body() authRegisterDTO: AuthRegisterDTO) {
    return this.admService.create(authRegisterDTO);
  }

  @Post('forget')
  async forget(@Body() authForgetDTO: AuthForgetDTO) {}

  @Post('reset')
  async reset(@Body() authResetDTO: AuthResetDTO) {}
}
