import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Adm } from '@prisma/client';
import { AdmService } from 'src/adm/adm.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly database: PrismaService,
    private readonly admService: AdmService,
  ) {}

  async createToken(adm: Adm) {
    return {
      accesToken: this.jwtService.sign(
        {
          id: adm.id,
        },
        {
          expiresIn: '30',
          subject: adm.id,
          audience: 'administrators',
          issuer: 'login',
        },
      ),
    };
  }

  async checkToken(token: string) {
    //return this.jwtService.verify()
  }

  async login(email: string, password: string) {
    const user = await this.database.adm.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.database.adm.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email está incorreto');
    }
  }

  async reset(password: string, token: string) {
    //TO DO: Validar o token

    //ID de exemplo
    const id = '4d053e2c-cee5-4c52-8bc3-81b96a335cd1';

    const user = await this.database.adm.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return this.createToken(user);
  }

  async register(authRegisterDTO: AuthRegisterDTO) {
    const user = await this.admService.create(authRegisterDTO);

    return this.createToken(user);
  }
}
