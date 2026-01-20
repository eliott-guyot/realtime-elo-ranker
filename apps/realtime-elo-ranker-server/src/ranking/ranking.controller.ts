// apps/realtime-elo-ranker-server/src/ranking/ranking.controller.ts
import { Controller, Get, Sse } from '@nestjs/common';
import { PlayersService } from '../players/players.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent, map } from 'rxjs';

@Controller('api/ranking')
export class RankingController {
  constructor(
      private readonly playersService: PlayersService,
      private readonly eventEmitter: EventEmitter2
    ) {}

  @Get()
  getRanking() {
    return this.playersService.getAllPlayers();
  }

  @Sse('events')
  sse(): Observable<any> {
    return fromEvent(this.eventEmitter, 'ranking.update').pipe(
      map((data) => {
          return { data };
      }),
    );
  }
}
