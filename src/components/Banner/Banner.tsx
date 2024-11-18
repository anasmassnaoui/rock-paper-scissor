import { Component, ReactNode } from "react";
import styles from "./styles.module.css";

type BannerProps = {
    balance: number,
    bet: number,
    win: number
}

export default class Banner extends Component<BannerProps> {
    render(): ReactNode {
        const { balance, bet, win } = this.props;
        return (
            <div className={styles.container}>
                <p className={styles.text}>BALANCE: <span className={styles.text_primary}>{balance}</span></p>
                <p className={styles.text}>BET: <span className={styles.text_primary}>{bet}</span></p>
                <p className={styles.text}>WIN: <span className={styles.text_primary}>{win}</span></p>
            </div>
        )
    }
}
