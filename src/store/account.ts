import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { AccountState } from "../shared/types";
import config from "../config";

const initialState: AccountState = {
  balance: config.INITIAL_BALANCE,
  win: 0
}

export const account = createSlice({
  name: 'account',
  initialState,
  reducers: {
    addBetBalance: (state: Draft<AccountState>, action: PayloadAction<number>) => {
      const amount = action.payload;
      state.balance -= amount;
    },
    addWinBalance: (state: Draft<AccountState>, action: PayloadAction<number>) => {
      const amount = action.payload;
      state.balance += amount > 0 ? amount : 0;
      state.win = (state.balance - config.INITIAL_BALANCE);
    },
  },
})

export const { addBetBalance, addWinBalance } = account.actions

export default account.reducer
