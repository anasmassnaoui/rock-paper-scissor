import { Component, ReactNode } from "react";
import { Coin } from "..";
import styles from "./styles.module.css";
import { classes } from "../../utils/cssUtils";

type BetCardProps = {
    name: string,
    value: number,
    base?: number,
    className?: string,
    onPress?: () => void,
    disabled?: boolean
}

export default class BetCard extends Component<BetCardProps> {

    getNumberOfBets(bet: number, base: number) {
        return bet / base;
    }

    renderCoin(index: number, numberOfCoins: number) {
        const className = index > 0 ? styles.stacked_coin : undefined;
        if (index === 14) {
            return <Coin key={String(index)} value={`+${numberOfCoins - 14}`} className={className} />
        }
        return <Coin key={String(index)} value={500} className={className} />
    }

    render(): ReactNode {
        const { name, value, base = 500, className, onPress, disabled } = this.props
        const numberOfBets = this.getNumberOfBets(value, base);
        const coins = Array(numberOfBets).fill(0);

        return (
            <div className={classes(styles.container, disabled && styles.disabled, className)} onClick={disabled ? undefined : onPress}>
                <div className={styles.coins}>
                    {coins.slice(0, 15).map((_, index) => this.renderCoin(index, coins.length))}
                </div>
                <p className={styles.text}>{name}</p>
            </div>
        )
    }
}
