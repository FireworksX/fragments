import { FC } from 'react';
import cn from 'classnames'
import styles from './styles.module.css';

interface StreamFilterLocationProps {
    className?: string
}

export const StreamFilterLocation: FC<StreamFilterLocationProps> = ({ className }) => {
    return <div className={cn(styles.root, className)} />;
};
