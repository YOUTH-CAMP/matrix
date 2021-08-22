import React from "react";
import styles from "./index.module.less";

export function RollList() {
  return (
    <div className={styles.container}>
      <div className={styles.line} />
      <div className={styles.cardList}>
        {Array.from({ length: 20 }).map((x, i) => {
          return (
            <div className={styles.cardContainer} key={i}>
              {i}布局占位，开发中...
            </div>
          );
        })}
      </div>
    </div>
  );
}
