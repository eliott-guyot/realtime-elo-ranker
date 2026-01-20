// apps/realtime-elo-ranker-server/src/ranking/ranking.gateway.ts
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { Player } from '../players/players.service';

@Injectable()
export class RankingEventsService {
  constructor(private eventEmitter: EventEmitter2) {}

  emitRankingUpdate(player: Player) {
    this.eventEmitter.emit('ranking.update', {
        type: "RankingUpdate",
        player: player
    });
  }
}
