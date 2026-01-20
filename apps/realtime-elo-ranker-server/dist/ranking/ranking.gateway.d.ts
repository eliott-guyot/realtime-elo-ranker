import { EventEmitter2 } from '@nestjs/event-emitter';
import { Player } from '../players/players.service';
export declare class RankingEventsService {
    private eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    emitRankingUpdate(player: Player): void;
}
