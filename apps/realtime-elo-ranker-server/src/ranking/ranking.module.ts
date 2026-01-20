import { Module } from '@nestjs/common';
import { RankingController } from './ranking.controller';
import { RankingEventsService } from './ranking.gateway';
import { PlayersModule } from '../players/players.module';

@Module({
  imports: [PlayersModule],
  controllers: [RankingController],
  providers: [RankingEventsService],
  exports: [RankingEventsService],
})
export class RankingModule {}
