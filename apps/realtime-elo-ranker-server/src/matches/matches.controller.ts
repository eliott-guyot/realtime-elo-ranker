// apps/realtime-elo-ranker-server/src/matches/matches.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { MatchesService, MatchRequest } from './matches.service';

@Controller('api/match')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  publishMatch(@Body() body: MatchRequest) {
    const result = this.matchesService.processMatch(body);

    if (!result) {
      throw new HttpException({
        code: 0,
        message: "Soit le gagnant, soit le perdant indiqué n'existe pas"
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return result;
  }
}
