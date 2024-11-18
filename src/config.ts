
type Config = {
    INITIAL_BALANCE: number,
    BET_AMOUNT: number,
    WININNG_RATE: [number, number],
    MAX_NUMBER_OF_RANDOM_CHOICES: number,
}

const config: Config = {
    INITIAL_BALANCE: 5000,
    BET_AMOUNT: 500,
    WININNG_RATE: [13, 5],
    MAX_NUMBER_OF_RANDOM_CHOICES: 20,
}

export default config;