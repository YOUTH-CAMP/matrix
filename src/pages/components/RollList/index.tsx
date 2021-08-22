import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./index.module.less";

export function RollList() {
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const containerRef = useCallback((node: any) => {
    if (!node) return;
    setContainerHeight(node.clientHeight);
  }, []);
  const contentRef = useCallback((node: any) => {
    if (!node) return;
    setContentHeight(node.clientHeight);
  }, []);

  const [offsetY, setOffsetY] = useState(0);

  const scroll = useCallback(() => {
    console.log({ offsetY });
    const nextY = offsetY + 0.1;
    setOffsetY(nextY);
    requestAnimationFrame(() => {
      scroll();
    });
  }, [containerHeight, contentHeight, offsetY, setOffsetY]);
  function onMouseEnter() {}

  function onMouseLeave() {}

  useEffect(() => {
    if (contentHeight > 0) {
      scroll();
    }
  }, [contentHeight]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        ref={contentRef}
        className={styles.cardList}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `translate3d(0, -${offsetY}px, 0)`,
        }}
      >
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
