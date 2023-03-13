import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdmModule } from './adm/adm.module';
import { GroupsModule } from './groups/groups.module';
import { TeamModule } from './team/team.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [AdmModule, GroupsModule, TeamModule, PlayerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
