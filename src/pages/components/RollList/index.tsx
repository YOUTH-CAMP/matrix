import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./index.module.less";
import Cards from "../../../components/Cards";
import { LocalstorageKey } from "@/constants";
import { useRequest } from "@/hooks/useRequest";

export function RollList() {
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const { data } = useRequest("getRollList");

  const containerRef = useCallback((node: any) => {
    if (!node) return;
    const resizeObserver = new ResizeObserver((entries) => {
      setContainerHeight(entries[0].target.clientHeight);
    });
    resizeObserver.observe(node);
  }, []);
  const contentRef = useCallback((node: any) => {
    if (!node) return;
    const resizeObserver = new ResizeObserver((entries) => {
      setContentHeight(entries[0].target.clientHeight);
    });
    resizeObserver.observe(node);
  }, []);

  const [offsetY, setOffsetY] = useState(0);

  const scroll = (y = 0) => {
    if (localStorage.getItem(LocalstorageKey.isStopScroll) === "true") return;
    setOffsetY(y);
    requestAnimationFrame(() => {
      scroll((y > contentHeight - containerHeight ? -0.1 : y) + 0.3);
    });
  };

  function onMouseEnter() {
    localStorage.setItem(LocalstorageKey.isStopScroll, "true");
  }

  function onMouseLeave() {
    localStorage.setItem(LocalstorageKey.isStopScroll, "false");
    scroll(offsetY);
  }

  useEffect(() => {
    if (contentHeight > 0 && containerHeight > 0) {
      onMouseLeave();
    }
  }, [contentHeight, containerHeight]);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* <div className ={styles.header}>
        <h1>快讯为您推荐中...</h1>
      </div> */}
      <div
        ref={contentRef}
        className={styles.cardList}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `translate3d(0, -${offsetY}px, 0)`,
        }}
      >
        {(data as any)?.data?.map((x: any, i: number) => {
          return (
            <div className={styles.cardContainer} key={i}>
              <Cards
                renderData={{
                  title: x.title,
                  content: x.content,
                  imageSrc: x.imageSrc?.includes("data:") ? null : x.imageSrc,
                  link: x.link,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
