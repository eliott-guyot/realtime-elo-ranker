import { MatchesService, MatchRequest } from './matches.service';
export declare class MatchesController {
    private readonly matchesService;
    constructor(matchesService: MatchesService);
    publishMatch(body: MatchRequest): import("./matches.service").MatchResponse;
}
