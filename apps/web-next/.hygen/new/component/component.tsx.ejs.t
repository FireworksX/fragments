---
to: <%= path %>/<%= component_name %>/ui/<%= component_name %>.tsx
---
import { FC } from 'react';
import cn from 'classnames'
import styles from './styles.module.css';

interface <%= component_name %>Props {
    className?: string
}

export const <%= component_name %>: FC<<%= component_name %>Props> = ({ className }) => {
    return <div className={cn(styles.root, className)} />;
};
