import { PlayersService, Player } from '../players/players.service';
import { RankingEventsService } from '../ranking/ranking.gateway';
export declare class MatchRequest {
    winner: string;
    loser: string;
    draw: boolean;
}
export interface MatchResponse {
    winner: Player;
    loser: Player;
}
export declare class MatchesService {
    private readonly playersService;
    private readonly rankingEventsService;
    private readonly logger;
    private readonly K_FACTOR;
    constructor(playersService: PlayersService, rankingEventsService: RankingEventsService);
    processMatch(matchData: MatchRequest): MatchResponse | null;
}
