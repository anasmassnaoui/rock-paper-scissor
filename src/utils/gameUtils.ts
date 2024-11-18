import { BetResults, BetType, PlayerBets, WinnerBet } from "../shared/types";

export function compareBets(bet1: BetType, bet2: BetType) {
    if (bet1 === bet2) {
        return 0;
    } else if (bet1 === 'ROCK' && bet2 === 'SCISSORS') {
        return 1;
    } else if (bet1 === 'PAPER' && bet2 === 'ROCK') {
        return 1
    } else if (bet1 === 'SCISSORS' && bet2 === 'PAPER') {
        return 1;
    } else {
        return -1;
    }
}

export function calculateBetsResults(playerBets: PlayerBets, computerBet: BetType) {
    const results: BetResults = {
        win: 0,
        lose: 0,
        winningBet: 'TIE',
    }
    const bets = Object.keys(playerBets) as BetType[];
    if (bets.length === 1) {
        const playerBet = bets[0];
        const result = compareBets(playerBet, computerBet);
        if (result === 0) {
            results.win = (playerBets[playerBet] || 0);
            results.lose = 0;
            results.winningBet = 'TIE';
        } else if (result > 0) {
            results.win = (playerBets[playerBet] || 0) * 14;
            results.lose = 0;
            results.winningBet = playerBet;
        } else {
            results.win = 0;
            results.lose = (playerBets[playerBet] || 0);
            results.winningBet = computerBet;
        }
    } else {
        const playerBet1 = bets[0];
        const playerBet2 = bets[1];
        if (compareBets(playerBet1, computerBet) > 0) {
            results.win = (playerBets[playerBet1] || 0) * 14;
            results.lose = 0;
            results.winningBet = playerBet1;
        } else if (compareBets(playerBet2, computerBet) > 0) {
            results.win = (playerBets[playerBet2] || 0) * 3;
            results.lose = 0;
            results.winningBet = playerBet2;
        } else {
            results.win = 0;
            results.lose = (playerBets[playerBet1] || 0) + (playerBets[playerBet2] || 0);
            results.winningBet = 'TIE';
        }
    }
    return results;
}

export function canPlayerBet(playerBets: PlayerBets, bet: BetType) {
    const bets = Object.keys(playerBets);
    return bets.length < 2 || bets.includes(bet);
}

export function getBestBet(playerBets: PlayerBets, computerBet: BetType) {
    const bets = Object.keys(playerBets) as BetType[];
    const bestBet: [BetType, number] = [bets[0], compareBets(bets[0], computerBet)]
    if (bets.length > 1 && compareBets(bets[1], computerBet) > bestBet[1]) {
        bestBet[0] = bets[1];
    }
    return bestBet[0];
}

export function hasWinnerBet(playerBets: PlayerBets, winnerBet: WinnerBet): winnerBet is BetType {
    return Object.keys(playerBets).includes(winnerBet);
}
