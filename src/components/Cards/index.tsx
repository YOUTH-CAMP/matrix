import React from "react";
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

  return (
    <Card
      className={style.card}
      onClick={() => {
        if (renderData?.link) {
          window.open();
        }
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ width: "95px", marginLeft: "5px" }}>
          <img
            src={
              renderData?.imageSrc ??
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            }
            alt=""
          ></img>
        </div>
        <Meta
          title={renderData?.title || ""}
          description={renderData?.content || ""}
          style={{ width: "200px" }}
        />
      </div>
    </Card>
  );
}

export default App;
