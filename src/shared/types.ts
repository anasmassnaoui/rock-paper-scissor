
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

export type BetType = 'ROCK' | 'PAPER' | 'SCISSORS';
export type WinnerBet = BetType | 'TIE';
export type GameStatus = 'BET' | 'COMPUTER_CHOICE' | 'COMPARE' | 'RESULT';
export type PlayerBets = Partial<Record<BetType, number>>;
export type BetAction = {
    bet: BetType,
    amount: number,
}
export type BetResults = {
    win: number,
    lose: number,
    winningBet: WinnerBet,
}
export type AccountState = {
    balance: number;
    win: number;
};
export type GameState = {
    bets: PlayerBets,
    status: GameStatus;
    win: number,
    lose: number,
    computerChoice: BetType,
    numberOfRandomChoices: number,
    winningBet: WinnerBet,
}

