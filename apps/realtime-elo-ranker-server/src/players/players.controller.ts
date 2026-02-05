// apps/realtime-elo-ranker-server/src/players/players.controller.ts
import { Controller, Post, Body, BadRequestException, ConflictException } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('api/player')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createPlayer(@Body('id') id: string) {
    try {
      return await this.playersService.addPlayer(id);
    } catch (error) {
      if (error.message === 'INVALID_ID') {
        throw new BadRequestException({ code: 0, message: "L'identifiant du joueur n'est pas valide" });
      }
      if (error.message === 'PLAYER_EXISTS') {
        throw new ConflictException({ code: 0, message: "Le joueur existe déjà" });
      }
      throw error;
    }
  }
}
