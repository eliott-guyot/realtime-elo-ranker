import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { PlayersModule } from '../players/players.module';
import { RankingModule } from '../ranking/ranking.module';

@Module({
  imports: [PlayersModule, RankingModule],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}

