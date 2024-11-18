import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { BetAction, BetResults, BetType, GameState } from '../shared/types';

const initialState: GameState = {
    status: 'BET',
    bets: {},
    win: 0,
    lose: 0,
    numberOfRandomChoices: 0,
    computerChoice: 'PAPER',
    winningBet: 'PAPER',
}

export const game = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        addBet: (state: Draft<GameState>, action: PayloadAction<BetAction>) => {
            const { bet, amount } = action.payload;
            state.bets[bet] = (state.bets[bet] || 0) + amount
        },
        generateComputerChoice: (state: Draft<GameState>) => {
            state.status = 'COMPUTER_CHOICE';
            const choices: BetType[] = ['PAPER', 'ROCK', 'SCISSORS'];
            const rand = Math.floor(Math.random() * choices.length);
            state.computerChoice = choices[rand];
            state.numberOfRandomChoices += 1;
        },
        matchBets: (state: Draft<GameState>) => {
            state.status = 'COMPARE';
        },
        calculateResult: (state: Draft<GameState>, action: PayloadAction<BetResults>) => {
            state.status = 'RESULT';
            const results = action.payload;
            state.win = results.win;
            state.lose = results.lose;
            state.winningBet = results.winningBet;
        },
        clearBets: (state: Draft<GameState>) => {
            state.status = 'BET';
            state.bets = {};
            state.numberOfRandomChoices = 0;
        }
    },
})

export const { addBet, generateComputerChoice, matchBets, calculateResult, clearBets } = game.actions

export default game.reducer