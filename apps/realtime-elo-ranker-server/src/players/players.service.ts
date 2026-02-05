// apps/realtime-elo-ranker-server/src/players/players.service.ts

import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerEntity } from './player.entity';
import { RankingEventsService } from '../ranking/ranking.gateway';


export interface Player {
  id: string;
  rank: number;
}


@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectRepository(PlayerEntity)
    private readonly playerRepository: Repository<PlayerEntity>,
    @Inject(forwardRef(() => RankingEventsService))
    private readonly rankingEventsService: RankingEventsService,
  ) {}


  async getPlayer(id: string): Promise<Player | undefined> {
    const entity = await this.playerRepository.findOneBy({ id });
    if (!entity) return undefined;
    return { id: entity.id, rank: entity.rank };
  }


  async getAllPlayers(): Promise<Player[]> {
    const entities = await this.playerRepository.find();
    return entities.map(e => ({ id: e.id, rank: e.rank })).sort((a, b) => b.rank - a.rank);
  }



  async addPlayer(id: string, initialRank?: number): Promise<Player> {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      throw new Error('INVALID_ID');
    }
    const existing = await this.playerRepository.findOneBy({ id });
    if (existing) {
      throw new Error('PLAYER_EXISTS');
    }
    const rank = initialRank ?? 0;
    const entity = this.playerRepository.create({ id, rank });
    await this.playerRepository.save(entity);
    const newPlayer = { id, rank };
    this.rankingEventsService.emitRankingUpdate(newPlayer);
    return newPlayer;
  }


  async updatePlayer(player: Player): Promise<void> {
    const entity = await this.playerRepository.findOneBy({ id: player.id });
    if (entity) {
      entity.rank = player.rank;
      await this.playerRepository.save(entity);
    }
  }
}
