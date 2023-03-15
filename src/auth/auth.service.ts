import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly database: PrismaService,
  ) {}

  async createToken() {
    //return this.jwtService.sign()
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

    //TO DO: enviar o email
    return true;
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

    await this.database.adm.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return true;
  }
}
