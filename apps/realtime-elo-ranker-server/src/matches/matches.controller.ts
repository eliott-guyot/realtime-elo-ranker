// apps/realtime-elo-ranker-server/src/matches/matches.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchRequestDto } from './match.dto';

@Controller('api/match')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  async publishMatch(@Body() body: MatchRequestDto) {
    const result = await this.matchesService.processMatch(body);

    if (!result) {
      throw new HttpException({
        code: 0,
        message: "Soit le gagnant, soit le perdant indiqué n'existe pas"
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return result;
  }
}
