import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useHistory, useLocation, useParams, useRouteMatch } from "react-router";
export const Header: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const match = useRouteMatch();
  console.log(history);
  console.log(location);
  console.log(params);
  console.log(match);
  return (
        <div className={styles['app-header']}>
          {/* top-header */}
          <div className={styles['top-header']}>
            <div className={styles.inner}>
              <Typography.Text>Make World Better</Typography.Text>
              <Dropdown.Button
                style={{ marginLeft: 15 }}
                overlay={
                  <Menu>
                    <Menu.Item>EN</Menu.Item>
                    <Menu.Item>CN</Menu.Item>
                  </Menu>
                }
                icon={<GlobalOutlined></GlobalOutlined>}
              >
                Language
              </Dropdown.Button>
              <Button.Group className={styles['button-group']}>
                <Button onClick = {() => history.push("register")}>Register</Button>
                <Button onClick = {() => history.push("signIn")}>Login</Button>
              </Button.Group>
            </div>

          </div>
          <Layout.Header className={styles['main-header']}>
            <span onClick = {() => history.push("/")}>
            <img src={logo} alt="logo" className={styles['App-logo']} />
            <Typography.Title level={3} className={styles.title}>React Pioneer Tools</Typography.Title>
            </span>
            <Input.Search
              placeholder={'enter previous order number'}
              className = {styles['search-input']}
            />
          </Layout.Header>
          <Menu mode = {'horizontal'} className={styles['main-menu']}>
            <Menu.Item key = {1}>Index</Menu.Item>
            <Menu.Item key = {2}>About</Menu.Item>
          </Menu>
        </div>
    );
};
