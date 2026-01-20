"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var PlayersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
let PlayersService = PlayersService_1 = class PlayersService {
    logger = new common_1.Logger(PlayersService_1.name);
    players = new Map();
    async onModuleInit() {
        await this.loadPlayers();
    }
    async loadPlayers() {
        const possiblePaths = [
            'apps/realtime-elo-ranker-api-mock/mocks/data/players.data.js',
            '../realtime-elo-ranker-api-mock/mocks/data/players.data.js'
        ];
        let filePath = '';
        for (const p of possiblePaths) {
            const resolved = path.resolve(process.cwd(), p);
            if (fs.existsSync(resolved)) {
                filePath = resolved;
                break;
            }
        }
        try {
            if (!filePath) {
                this.logger.error(`Player data file not found. Checked: ${possiblePaths.join(', ')}`);
                return;
            }
            this.logger.log(`Loading players from ${filePath}`);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const match = fileContent.match(/const FAKE_PLAYERS = \[\s*([\s\S]*?)\s*\];/);
            if (match && match[1]) {
                const rawList = match[1];
                const ids = rawList
                    .split(',')
                    .map(s => s.trim())
                    .filter(s => s.length > 0)
                    .map(s => s.replace(/^["']|["']$/g, ''));
                ids.forEach(id => {
                    if (id) {
                        this.players.set(id, { id, rank: 0 });
                    }
                });
                this.logger.log(`Loaded ${this.players.size} players.`);
            }
            else {
                this.logger.error('Could not parse players data file format.');
            }
        }
        catch (error) {
            this.logger.error(`Failed to load players: ${error.message}`);
        }
    }
    getPlayer(id) {
        return this.players.get(id);
    }
    getAllPlayers() {
        return Array.from(this.players.values()).sort((a, b) => b.rank - a.rank);
    }
    addPlayer(id) {
        const existing = this.players.get(id);
        if (existing) {
            return existing;
        }
        const newPlayer = { id, rank: 1000 };
        this.players.set(id, newPlayer);
        return newPlayer;
    }
    updatePlayer(player) {
        if (this.players.has(player.id)) {
            this.players.set(player.id, player);
        }
    }
};
exports.PlayersService = PlayersService;
exports.PlayersService = PlayersService = PlayersService_1 = __decorate([
    (0, common_1.Injectable)()
], PlayersService);
//# sourceMappingURL=players.service.js.map