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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PlayersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("./player.entity");
const ranking_gateway_1 = require("../ranking/ranking.gateway");
let PlayersService = PlayersService_1 = class PlayersService {
    playerRepository;
    rankingEventsService;
    logger = new common_1.Logger(PlayersService_1.name);
    constructor(playerRepository, rankingEventsService) {
        this.playerRepository = playerRepository;
        this.rankingEventsService = rankingEventsService;
    }
    async getPlayer(id) {
        const entity = await this.playerRepository.findOneBy({ id });
        if (!entity)
            return undefined;
        return { id: entity.id, rank: entity.rank };
    }
    async getAllPlayers() {
        const entities = await this.playerRepository.find();
        return entities.map(e => ({ id: e.id, rank: e.rank })).sort((a, b) => b.rank - a.rank);
    }
    async addPlayer(id, initialRank) {
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
    async updatePlayer(player) {
        const entity = await this.playerRepository.findOneBy({ id: player.id });
        if (entity) {
            entity.rank = player.rank;
            await this.playerRepository.save(entity);
        }
    }
};
exports.PlayersService = PlayersService;
exports.PlayersService = PlayersService = PlayersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.PlayerEntity)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => ranking_gateway_1.RankingEventsService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ranking_gateway_1.RankingEventsService])
], PlayersService);
//# sourceMappingURL=players.service.js.map