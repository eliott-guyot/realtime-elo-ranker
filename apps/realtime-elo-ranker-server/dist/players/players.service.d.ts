import { OnModuleInit } from '@nestjs/common';
export interface Player {
    id: string;
    rank: number;
}
export declare class PlayersService implements OnModuleInit {
    private readonly logger;
    private players;
    onModuleInit(): Promise<void>;
    private loadPlayers;
    getPlayer(id: string): Player | undefined;
    getAllPlayers(): Player[];
    addPlayer(id: string): Player;
    updatePlayer(player: Player): void;
}
