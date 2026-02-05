
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { RankingModule } from '../ranking/ranking.module';
import { PlayerEntity } from './player.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([PlayerEntity]),
    forwardRef(() => RankingModule)
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}

