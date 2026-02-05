import { Repository } from 'typeorm';
import { PlayerEntity } from './player.entity';
import { RankingEventsService } from '../ranking/ranking.gateway';
export interface Player {
    id: string;
    rank: number;
}
export declare class PlayersService {
    private readonly playerRepository;
    private readonly rankingEventsService;
    private readonly logger;
    constructor(playerRepository: Repository<PlayerEntity>, rankingEventsService: RankingEventsService);
    getPlayer(id: string): Promise<Player | undefined>;
    getAllPlayers(): Promise<Player[]>;
    addPlayer(id: string, initialRank?: number): Promise<Player>;
    updatePlayer(player: Player): Promise<void>;
}
