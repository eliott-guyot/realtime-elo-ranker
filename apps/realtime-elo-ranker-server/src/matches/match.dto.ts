export class MatchRequestDto {
  winner: string;
  loser: string;
  draw: boolean;
}

export interface MatchResponseDto {
  winner: any;
  loser: any;
}
