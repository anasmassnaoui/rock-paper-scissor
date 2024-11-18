import { configureStore } from '@reduxjs/toolkit'
import account from './account'
import game from './game'

const store = configureStore({
  reducer: {
    account,
    game,
  },
})

export default store;
export type AppState = ReturnType<typeof store.getState>;
