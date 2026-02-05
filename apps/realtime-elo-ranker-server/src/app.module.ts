
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { MatchesModule } from './matches/matches.module';
import { RankingModule } from './ranking/ranking.module';
import { PlayerEntity } from './players/player.entity';


@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      // type: 'better-sqlite3',
      database: 'db.sqlite',
      type: 'sqlite',

      entities: [PlayerEntity],
      synchronize: true,
    }),
    PlayersModule,
    MatchesModule,
    RankingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


