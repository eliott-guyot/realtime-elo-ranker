import { MatchesService } from './matches.service';
import { MatchRequestDto } from './match.dto';
export declare class MatchesController {
    private readonly matchesService;
    constructor(matchesService: MatchesService);
    publishMatch(body: MatchRequestDto): Promise<import("./match.dto").MatchResponseDto>;
}
