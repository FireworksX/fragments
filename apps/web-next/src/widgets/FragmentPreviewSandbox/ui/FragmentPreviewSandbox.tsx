import { FC } from 'react';
import cn from 'classnames'
import styles from './styles.module.css';

interface FragmentPreviewSandboxProps {
    className?: string
}

export const FragmentPreviewSandbox: FC<FragmentPreviewSandboxProps> = ({ className }) => {
    return <div className={cn(styles.root, className)} />;
};
