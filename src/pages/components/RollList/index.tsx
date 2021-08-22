import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./index.module.less";
import Cards from "../../../components/Cards";
import { LocalstorageKey } from "@/constants";
import { useRequest } from "@/hooks/useRequest";

export function RollList() {
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const { data } = useRequest("getNews");

  const containerRef = useCallback((node: any) => {
    if (!node) return;
    console.log("操A", node.clientHeight);
    setContainerHeight(node.clientHeight);
  }, []);
  const contentRef = useCallback((node: any) => {
    if (!node) return;
    console.log("操B", node.clientHeight);
    setContentHeight(node.clientHeight);
  }, []);

  const [offsetY, setOffsetY] = useState(0);

  const scroll = (y: number = 0) => {
    if (localStorage.getItem(LocalstorageKey.isStopScroll) === "true") return;
    setOffsetY(y + 0.1);
    requestAnimationFrame(() => {
      scroll(y > contentHeight - containerHeight ? 0 : y);
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
    // console.log(contentHeight, containerHeight);
    // if (contentHeight > 0 && containerHeight > 0) {
    //   console.log("fuck", contentHeight, containerHeight);
    //   onMouseLeave();
    // }
  }, [contentHeight, containerHeight]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        ref={contentRef}
        className={styles.cardList}
        // onMouseEnter={onMouseEnter}
        // onMouseLeave={onMouseLeave}
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
                  imageSrc: x.imageSrc,
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
