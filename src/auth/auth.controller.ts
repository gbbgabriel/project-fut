import { Body, Controller, Post } from '@nestjs/common';
import { AdmService } from 'src/adm/adm.service';
import { AuthService } from './auth.service';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly admService: AdmService,
    private readonly authService: AuthService,
  ) {}
  @Post('login')
  async login(@Body() authLoginDTO: AuthLoginDTO) {
    return this.authService.login(authLoginDTO.email, authLoginDTO.password);
  }

  @Post('register')
  async register(@Body() authRegisterDTO: AuthRegisterDTO) {
    return this.authService.register(authRegisterDTO);
  }

  @Post('forget')
  async forget(@Body() authForgetDTO: AuthForgetDTO) {
    return this.authService.forget(authForgetDTO.email);
  }

  @Post('reset')
  async reset(@Body() authResetDTO: AuthResetDTO) {
    this.authService.reset(authResetDTO.password, authResetDTO.token);
  }
}
