// apps/realtime-elo-ranker-server/src/matches/matches.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { PlayersService, Player } from '../players/players.service';
import { RankingEventsService } from '../ranking/ranking.gateway';

export class MatchRequest {

  winner: string;
  loser: string;
  draw: boolean;
}

export interface MatchResponse {
  winner: Player;
  loser: Player;
}

@Injectable()
export class MatchesService {
  private readonly logger = new Logger(MatchesService.name);
  private readonly K_FACTOR = 32;

  constructor(
      private readonly playersService: PlayersService,
      private readonly rankingEventsService: RankingEventsService
    ) {}

  processMatch(matchData: MatchRequest): MatchResponse | null {
    const winnerPlayer = this.playersService.getPlayer(matchData.winner);
    const loserPlayer = this.playersService.getPlayer(matchData.loser);

    if (!winnerPlayer || !loserPlayer) {
      return null;
    }

    const winnerRank = winnerPlayer.rank;
    const loserRank = loserPlayer.rank;

    // Pour calculer les points. Cela va etre au merite. Si une personne merite de perdre (ecart de points important) mais qu'elle gagne elle va gagner beaucoup de points et inversement
    const expectedWinner = 1 / (1 + Math.pow(10, (loserRank - winnerRank) / 400));
    const expectedLoser = 1 / (1 + Math.pow(10, (winnerRank - loserRank) / 400));

    let actualWinnerScore = 1;
    let actualLoserScore = 0;

    if (matchData.draw) {
      actualWinnerScore = 0.5;
      actualLoserScore = 0.5;
    }

    // New Ratings
    const newWinnerRank = Math.round(winnerRank + this.K_FACTOR * (actualWinnerScore - expectedWinner));
    const newLoserRank = Math.round(loserRank + this.K_FACTOR * (actualLoserScore - expectedLoser));
    winnerPlayer.rank = newWinnerRank;
    loserPlayer.rank = newLoserRank;

    this.playersService.updatePlayer(winnerPlayer);
    this.playersService.updatePlayer(loserPlayer);

    this.rankingEventsService.emitRankingUpdate(winnerPlayer);
    this.rankingEventsService.emitRankingUpdate(loserPlayer);

    this.logger.log('--- Match Result ---');
    this.logger.log(`Draw: ${matchData.draw}`);
    this.logger.log(`Player 1 (Winner/Draw A): ${winnerPlayer.id} | Old: ${winnerRank} -> New: ${newWinnerRank}`);
    this.logger.log(`Player 2 (Loser/Draw B): ${loserPlayer.id} | Old: ${loserRank} -> New: ${newLoserRank}`);
    this.logger.log('--------------------');

    return {
      winner: winnerPlayer,
      loser: loserPlayer,
    };
  }
}
