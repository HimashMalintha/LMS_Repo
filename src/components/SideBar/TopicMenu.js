import React from "react";
import { Menu } from "antd";
import logo from '../../assets/book.jpg';
import { useSelector } from "react-redux";

const TopicMenu = ({ topics, selectedKey, changeSelectedKey }) => {
  // const role = useSelector((state) => state.authentication.role);
  const role = "user"
  const styledTopics = topics.map((topic, index) => {
    // Render different menu items based on the role
    switch (index) {
      case 0:
        return (
          <Menu.Item key={index.toString()} onClick={changeSelectedKey}>
            {topic}
          </Menu.Item>
        );
      case 1:
        return (
          role === "user" && (
            <Menu.Item key={index.toString()} onClick={changeSelectedKey}>
              {topic}
            </Menu.Item>
          )
        );
      case 2:
        return (
          role === "user" && (
            <Menu.Item key={index.toString()} onClick={changeSelectedKey}>
              {topic}
            </Menu.Item>
          )
        );
      case 3:
        return (
          role === "user" && (
            <Menu.Item key={index.toString()} onClick={changeSelectedKey}>
              {topic}
            </Menu.Item>
          )
        );
      case 4:
        return (
          <Menu.Item key={index.toString()} onClick={changeSelectedKey}>
            {topic}
          </Menu.Item>
        );
      default:
        return (
          <Menu.Item key={index.toString()} onClick={changeSelectedKey}>
            {topic}
          </Menu.Item>
        );
    }
  });

  return (
    <>
      <img src={logo} width={150} height={150} alt="Logo" />
      <Menu mode="inline" selectedKeys={[selectedKey]}>
        {styledTopics}
      </Menu>
    </>
  );
};

export default TopicMenu;
