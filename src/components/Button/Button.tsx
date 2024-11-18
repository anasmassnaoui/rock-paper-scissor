import { Component, ReactNode } from "react"
import styles from "./styles.module.css";
import { classes } from "../../utils/cssUtils";

type ButtonProps = {
    name: string,
    onPress?: () => void,
    disabled?: boolean
}

export default class Button extends Component<ButtonProps> {

    render(): ReactNode {
        const { name, onPress, disabled } = this.props;

        return (
            <div className={classes(styles.container, disabled && styles.disabled)} onClick={disabled ? undefined : onPress}>
                <p className={styles.text}>{name}</p>
            </div>
        )
    }
}
