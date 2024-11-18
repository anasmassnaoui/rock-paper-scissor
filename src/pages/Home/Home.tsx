import { Component, Fragment, ReactNode } from "react";
import { Banner, BetsRow, Button } from '../../components'
import styles from "./styles.module.css";
import { AccountState, BetType, GameState } from "../../shared/types";
import { connect } from "react-redux";
import store, { AppState } from "../../store";
import { addBet, calculateResult, clearBets, generateComputerChoice, matchBets } from "../../store/game";
import { calculateBetsResults, canPlayerBet, getBestBet, hasWinnerBet } from "../../utils/gameUtils";
import { addWinBalance, addBetBalance } from "../../store/account";

type HomeProps = {
    account: AccountState,
    game: GameState
}

const BET_AMOUNT = 500;

class Home extends Component<HomeProps> {
    constructor(props: HomeProps) {
        super(props);
        this.handlePlay = this.handlePlay.bind(this);
        this.handleBets = this.handleBets.bind(this);
        this.getBestBet = this.getBestBet.bind(this);
    }

    handleBets(bet: BetType) {
        const { account, game } = this.props
        if (account.balance >= BET_AMOUNT && canPlayerBet(game.bets, bet)) {
            store.dispatch(addBet({ bet, amount: BET_AMOUNT }));
            store.dispatch(addBetBalance(BET_AMOUNT))
        }
    }

    generateComputerChoice() {
        const { game } = this.props
        if (game.numberOfRandomChoices < 40) {
            store.dispatch(generateComputerChoice())
            setTimeout(() => this.generateComputerChoice(), 100);
        } else {
            setTimeout(() => store.dispatch(matchBets()), 500);
            setTimeout(() => this.calculateResult(), 2000)
        }
    }

    calculateResult() {
        const { game } = this.props
        const results = calculateBetsResults(game.bets, game.computerChoice);
        console.log(results, game.bets)
        store.dispatch(calculateResult(results))
        store.dispatch(addWinBalance(results.win - results.lose))
    }

    getBestBet() {
        const { game } = this.props;
        return getBestBet(game.bets, game.computerChoice);
    }

    handlePlay() {
        const { game } = this.props
        if (game.status === 'BET') {
            this.generateComputerChoice();
        } else {
            store.dispatch(clearBets())
        }
    }

    render(): ReactNode {
        const { account, game } = this.props;
        const bets = Object.keys(game.bets);
        const status = game.status;
        const totalBet = (game.bets.PAPER || 0) + (game.bets.ROCK || 0) + (game.bets.SCISSORS || 0)
        const winningBet = (status === 'RESULT' && hasWinnerBet(game.bets, game.winningBet)) ? game.winningBet : undefined;
        const isButtonDisabled = bets.length === 0 || (status !== 'BET' && status !== 'RESULT');
        return (
            <div className={styles.container}>
                <Banner balance={account.balance} bet={totalBet} win={account.win} />
                <div className={styles.content}>
                    <div className={styles.section}>
                        {status === 'COMPUTER_CHOICE' && <p className={styles.generatedBet}>{game.computerChoice}</p>}
                        {status === 'COMPARE' && <p className={styles.betText}>{this.getBestBet()}<span className={styles.betComparatorText}>vs</span>{game.computerChoice}</p>}
                        {status === 'RESULT' &&
                            <Fragment>
                                <p className={styles.winningBetText}>{game.winningBet !== 'TIE' ? (game.winningBet + " WON") : "IT'S A TIE"}</p>
                                <p className={styles.gainText}>{game.win > 0 ? 'YOU WIN ' : 'YOU LOSE'} <span className={styles.gainAmountText}>{game.win > 0 ? game.win : game.lose}</span></p>
                            </Fragment>
                        }
                        {status === 'BET' && <p className={styles.noteText}>PICK YOUR POSITIONS</p>}
                    </div>
                    <div className={styles.section}>
                        <BetsRow
                            bets={game.bets}
                            winningBet={winningBet}
                            onPress={this.handleBets}
                            disabled={status !== 'BET'}
                        />
                    </div>
                    <div className={styles.section}>
                        <Button
                            name={status === 'RESULT' ? "CLEAR" : "PLAY"}
                            onPress={this.handlePlay}
                            disabled={isButtonDisabled}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    account: state.account,
    game: state.game,
});

export default connect(mapStateToProps)(Home);
