import React from "react";
import { Card, } from 'antd';
import style from "./index.module.less";

const { Meta } = Card;


function App(): JSX.Element {
    
    return (
        <Card className={style.card} >
            <div style={{ display: 'flex'}}>
                <div style ={{width: '95px', marginLeft:'5px'}}>
                    <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt ='temp'></img>
                </div>
                <Meta
                    title="Card title"
                    description="This is the description xxxxfxfxfxxfxfxfxf  jhfifiosus  gfdgjkshgjkrsfsdfs "
                    style ={{width: '200px'}}
                />
            </div>
        </Card>
    )
}

export default App;
