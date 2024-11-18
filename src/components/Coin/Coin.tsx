import { Component, ReactNode } from "react";
import styles from "./styles.module.css";
import { classes } from "../../utils/cssUtils";

type CoinProps = {
    value: number | string
    className?: string
}

export default class Coin extends Component<CoinProps> {
 
    render(): ReactNode {
        const { value, className } = this.props;
        return (
            <div className={classes(styles.container, className)}>
                <p className={styles.text}>{value}</p>
            </div>
        )
    }
}
