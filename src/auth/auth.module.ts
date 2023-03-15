import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdmModule } from 'src/adm/adm.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '47ca4da1d4be1078d111171fa23578d1',
    }),
    AdmModule,
    PrismaModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
