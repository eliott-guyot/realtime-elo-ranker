"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MatchesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchesService = void 0;
const common_1 = require("@nestjs/common");
const players_service_1 = require("../players/players.service");
const ranking_gateway_1 = require("../ranking/ranking.gateway");
let MatchesService = MatchesService_1 = class MatchesService {
    playersService;
    rankingEventsService;
    logger = new common_1.Logger(MatchesService_1.name);
    K_FACTOR = 32;
    constructor(playersService, rankingEventsService) {
        this.playersService = playersService;
        this.rankingEventsService = rankingEventsService;
    }
    async processMatch(matchData) {
        const winnerPlayer = await this.playersService.getPlayer(matchData.winner);
        const loserPlayer = await this.playersService.getPlayer(matchData.loser);
        if (!winnerPlayer || !loserPlayer) {
            return null;
        }
        const winnerRank = winnerPlayer.rank;
        const loserRank = loserPlayer.rank;
        const expectedWinner = 1 / (1 + Math.pow(10, (loserRank - winnerRank) / 400));
        const expectedLoser = 1 / (1 + Math.pow(10, (winnerRank - loserRank) / 400));
        let actualWinnerScore = 1;
        let actualLoserScore = 0;
        if (matchData.draw) {
            actualWinnerScore = 0.5;
            actualLoserScore = 0.5;
        }
        const newWinnerRank = Math.round(winnerRank + this.K_FACTOR * (actualWinnerScore - expectedWinner));
        const newLoserRank = Math.round(loserRank + this.K_FACTOR * (actualLoserScore - expectedLoser));
        winnerPlayer.rank = newWinnerRank;
        loserPlayer.rank = newLoserRank;
        await this.playersService.updatePlayer(winnerPlayer);
        await this.playersService.updatePlayer(loserPlayer);
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
};
exports.MatchesService = MatchesService;
exports.MatchesService = MatchesService = MatchesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [players_service_1.PlayersService,
        ranking_gateway_1.RankingEventsService])
], MatchesService);
//# sourceMappingURL=matches.service.js.map