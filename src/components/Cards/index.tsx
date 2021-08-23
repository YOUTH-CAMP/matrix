import React, { useMemo } from "react";
import { Card } from "antd";
import style from "./index.module.less";

const { Meta } = Card;

interface ICardProps {
  renderData: {
    title: string;
    imageSrc?: string;
    content: string;
    link?: string;
  };
}

function App(props: ICardProps): JSX.Element {
  const { renderData } = props;

  const description = useMemo(() => {
    const descriptionMaxLength = 70;
    const str = renderData?.content || "";
    return str.length > descriptionMaxLength
      ? str.slice(0, descriptionMaxLength) + "..."
      : str;
  }, [renderData?.content]);

  return (
    <Card
      bordered={false}
      className={style.card}
      onClick={() => {
        if (renderData?.link) {
          window.open(renderData.link);
        }
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1 1" }}>
          <img
            style={{ maxWidth: "100%" }}
            src={
              renderData?.imageSrc ||
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            }
            alt=""
          />
        </div>
        <Meta
          title={renderData?.title || ""}
          description={description}
          style={{ width: "180px", paddingLeft: 8 }}
        />
      </div>
    </Card>
  );
}

export default App;
