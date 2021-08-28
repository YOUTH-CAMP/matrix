import { Dropdown, Menu } from "antd";
import React, { useMemo } from "react";
import { classNames } from "../../utils/classnames";
export interface UserMenuProps {
  userName: string;
  dropList: Array<{ title: string; onClick?: () => void }>;
  className?: string;
  menuClassName?: string;
  style?: React.CSSProperties;
  menuStyle?: React.CSSProperties;
}

const UserMenu = ({
  userName,
  dropList,
  className,
  menuClassName,
  style,
  menuStyle,
}: UserMenuProps) => {
  const menu = (
    <Menu className={classNames(menuClassName)} style={menuStyle}>
      {dropList.map((item, index) => {
        return (
          <Menu.Item key={index}>
            <a onClick={item.onClick}>{item.title}</a>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <span className={classNames(className)} style={style}>
        {userName}
      </span>
    </Dropdown>
  );
};

export default React.memo(UserMenu);
