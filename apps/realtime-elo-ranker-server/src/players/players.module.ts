import { Module, forwardRef } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { RankingModule } from '../ranking/ranking.module';

@Module({
  imports: [forwardRef(() => RankingModule)],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}

