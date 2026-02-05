import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';
import { Repository } from 'typeorm';
import { PlayerEntity } from './player.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RankingEventsService } from '../ranking/ranking.gateway';

const mockPlayerRepository = {
  findOneBy: jest.fn(),
  find: jest.fn(),
};
const mockRankingEventsService = {};

describe('PlayersService', () => {
  let service: PlayersService;

  beforeEach(() => {
    service = new PlayersService(
      mockPlayerRepository as any,
      mockRankingEventsService as any
    );
  });

  it('should return undefined if player not found', async () => {
    mockPlayerRepository.findOneBy.mockResolvedValueOnce(undefined);
    const player = await service.getPlayer('unknown');
    expect(player).toBeUndefined();
  });

  it('should return player if found', async () => {
    mockPlayerRepository.findOneBy.mockResolvedValueOnce({ id: 'p1', rank: 1000 });
    const player = await service.getPlayer('p1');
    expect(player).toEqual({ id: 'p1', rank: 1000 });
  });

  it('should return all players sorted by rank', async () => {
    mockPlayerRepository.find.mockResolvedValueOnce([
      { id: 'a', rank: 900 },
      { id: 'b', rank: 1200 },
      { id: 'c', rank: 1100 },
    ]);
    const players = await service.getAllPlayers();
    expect(players.map(p => p.id)).toEqual(['b', 'c', 'a']);
  });
});
