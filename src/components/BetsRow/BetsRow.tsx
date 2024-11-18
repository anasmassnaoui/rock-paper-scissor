import { Component, ReactNode } from "react";
import { BetCard } from "..";
import styles from "./styles.module.css";
import { classes } from "../../utils/cssUtils";
import { BetType } from "../../shared/types";

type BetsProps = {
    winningBet?: BetType
    bets?: Partial<Record<BetType, number>>
    onPress?: (betType: BetType) => void,
    disabled?: boolean
}

export default class BetsRow extends Component<BetsProps> {

    events = {
        rock: () => this.props.onPress?.('ROCK'),
        paper: () => this.props.onPress?.('PAPER'),
        scissors: () => this.props.onPress?.('SCISSORS'),
    }

    render(): ReactNode {
        const { bets, winningBet, disabled } = this.props
        return (
            <div className={styles.container}>
                <BetCard name="ROCK" value={bets?.ROCK || 0} className={classes(styles.card_blue, winningBet === 'ROCK' && styles.card_win_blue)} onPress={this.events.rock} disabled={disabled} />
                <BetCard name="PAPER" value={bets?.PAPER || 0} className={classes(styles.card_green, winningBet === 'PAPER' && styles.card_win_green)} onPress={this.events.paper} disabled={disabled} />
                <BetCard name="SCISSORS" value={bets?.SCISSORS || 0} className={classes(styles.card_red, winningBet === 'SCISSORS' && styles.card_win_red)} onPress={this.events.scissors} disabled={disabled} />
            </div>
        )
    }
}
