import { PlayersService } from '../players/players.service';
import { RankingEventsService } from '../ranking/ranking.gateway';
import { MatchRequestDto, MatchResponseDto } from './match.dto';
export declare class MatchesService {
    private readonly playersService;
    private readonly rankingEventsService;
    private readonly logger;
    private readonly K_FACTOR;
    constructor(playersService: PlayersService, rankingEventsService: RankingEventsService);
    processMatch(matchData: MatchRequestDto): Promise<MatchResponseDto | null>;
}
