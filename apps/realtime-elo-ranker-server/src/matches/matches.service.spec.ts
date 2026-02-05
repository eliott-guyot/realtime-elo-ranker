import { Test, TestingModule } from '@nestjs/testing';
import { MatchesService } from './matches.service';
import { MatchRequestDto } from './match.dto';
import { PlayersService } from '../players/players.service';
import { RankingEventsService } from '../ranking/ranking.gateway';

const mockPlayersService = {
  getPlayer: jest.fn(),
  updatePlayer: jest.fn(),
};
const mockRankingEventsService = {
  emitRankingUpdate: jest.fn(),
};

describe('MatchesService', () => {
  let service: MatchesService;

  beforeEach(() => {
    service = new MatchesService(
      mockPlayersService as any,
      mockRankingEventsService as any
    );
  });

  it('should return null if winner or loser does not exist', async () => {
    mockPlayersService.getPlayer.mockResolvedValueOnce(undefined);
    mockPlayersService.getPlayer.mockResolvedValueOnce({ id: 'loser', rank: 1000 });
    const result = await service.processMatch({ winner: 'winner', loser: 'loser', draw: false } as MatchRequestDto);
    expect(result).toBeNull();
  });

  it('should process a match and update ranks', async () => {
    mockPlayersService.getPlayer.mockResolvedValueOnce({ id: 'winner', rank: 1200 });
    mockPlayersService.getPlayer.mockResolvedValueOnce({ id: 'loser', rank: 1000 });
    const result = await service.processMatch({ winner: 'winner', loser: 'loser', draw: false } as MatchRequestDto);
    expect(result).toHaveProperty('winner');
    expect(result).toHaveProperty('loser');
    expect(mockPlayersService.updatePlayer).toHaveBeenCalledTimes(2);
    expect(mockRankingEventsService.emitRankingUpdate).toHaveBeenCalled();
  });
});
