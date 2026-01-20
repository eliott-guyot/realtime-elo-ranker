// apps/realtime-elo-ranker-server/src/players/players.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('api/player')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  createPlayer(@Body('id') id: string) {
    return this.playersService.addPlayer(id);
  }
}
