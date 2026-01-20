// apps/realtime-elo-ranker-server/src/players/players.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

export interface Player {
  id: string;
  rank: number;
}

@Injectable()
export class PlayersService implements OnModuleInit {
  private readonly logger = new Logger(PlayersService.name);
  private players = new Map<string, Player>();

  async onModuleInit() {
    await this.loadPlayers();
  }

  private async loadPlayers() {
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
      
      // Extract array content using regex
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
      } else {
        this.logger.error('Could not parse players data file format.');
      }
    } catch (error) {
      this.logger.error(`Failed to load players: ${error.message}`);
    }
  }

  getPlayer(id: string): Player | undefined {
    return this.players.get(id);
  }

  getAllPlayers(): Player[] {
    return Array.from(this.players.values()).sort((a, b) => b.rank - a.rank);
  }

  addPlayer(id: string): Player {
    const existing = this.players.get(id);
    if (existing) {
      return existing;
    }
    const newPlayer = { id, rank: 1000 };
    this.players.set(id, newPlayer);
    return newPlayer;
  }

  updatePlayer(player: Player): void {
    if (this.players.has(player.id)) {
      this.players.set(player.id, player);
    }
  }
}
