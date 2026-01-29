import { OnModuleInit } from '@nestjs/common';
import { RankingEventsService } from '../ranking/ranking.gateway';
export interface Player {
    id: string;
    rank: number;
}
export declare class PlayersService implements OnModuleInit {
    private readonly rankingEventsService;
    private readonly logger;
    private players;
    constructor(rankingEventsService: RankingEventsService);
    onModuleInit(): Promise<void>;
    private loadPlayers;
    getPlayer(id: string): Player | undefined;
    getAllPlayers(): Player[];
    addPlayer(id: string, initialRank?: number): Player;
    updatePlayer(player: Player): void;
}
