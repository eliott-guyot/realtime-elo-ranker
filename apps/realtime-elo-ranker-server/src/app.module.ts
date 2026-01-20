import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { MatchesModule } from './matches/matches.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    PlayersModule,
    MatchesModule,
    RankingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


