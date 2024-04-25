import React from "react";
import styles from '@/styles/Table.module.css';

const cellElements = (): string[] => {
    const element: string[] = [];
    for (let i = 0; i < 12; i++) {
        element.push(`cell ${i + 1}`);
    }
    return element;
}

const Table: React.FC = () => {
    const elements: string[] = cellElements();
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {elements.map((cell, i) => {
                    return (
                        <div key={i} className={styles.column}>
                            {cell}
                            <span className={styles.tooltip}>{`tooltip ${i + 1}`}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Table;
