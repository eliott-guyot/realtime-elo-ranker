import { PlayersService } from '../players/players.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
export declare class RankingController {
    private readonly playersService;
    private readonly eventEmitter;
    constructor(playersService: PlayersService, eventEmitter: EventEmitter2);
    getRanking(): Promise<import("../players/players.service").Player[]>;
    sse(): Observable<any>;
}
