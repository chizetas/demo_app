import React, {useEffect, useState} from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useHistory, useLocation, useParams, useRouteMatch } from "react-router";
// import { useSelector } from "react-redux"
// import { RootState } from "../../redux/store";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { LanguageActionTypes, changeLanguageActionCreator} from "../../redux/language/languageActions"
import { useTranslation} from 'react-i18next'
import jwt_decode, {JwtPayload as DefaultJwtPayload} from "jwt-decode"
import { userSlice } from "../../redux/user/slice";

interface JwtPayload extends DefaultJwtPayload {
  name: string
  mail: string
}
export const Header: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const match = useRouteMatch();
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const jwt = useSelector(s => s.user.token)

  const [username, setUsername] = useState("")

  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt)
      setUsername(token.name)

    }
  },[jwt])


  console.log(history);
  console.log(location);
  console.log(params);
  console.log(match);

  const menuClickHandler = (e) => {
    console.log(e);

    // const action =  changeLanguageActionCreator(e.key)
    // store.dispatch(action);

    dispatch(changeLanguageActionCreator(e.key));

  };

  const onLogout = () => {
    dispatch(userSlice.actions.logout())
    history.push('/')
    window.location.reload(false)
  }

  return (
        <div className={styles['app-header']}>
          {/* top-header */}
          <div className={styles['top-header']}>
            <div className={styles.inner}>
              <Typography.Text>Make World Better</Typography.Text>
              <Dropdown.Button
                style={{ marginLeft: 15 }}
                overlay={
                  <Menu onClick = {menuClickHandler}>
                    {languageList.map(l =>{
                      return <Menu.Item key = {l.code}>{l.name}</Menu.Item>
                    })}
      
                  </Menu>
                }
                icon={<GlobalOutlined></GlobalOutlined>}
              >
                {language === "zh" ? "中文" : "English"}
              </Dropdown.Button>
              {jwt ?
                (<Button.Group className={styles['button-group']}>
                  <span>
                    {t("header.welcome")}
                    <Typography.Text strong>{username}</Typography.Text>
                  </span>
                  <Button onClick = {() => history.push("/profile")}>{t("header.profile")}</Button>
                  <Button onClick ={() => history.push('/shoppingCart')}>{t("header.shopping_cart")}</Button>
                  <Button onClick={onLogout}>{t("header.logout")}</Button>
                </Button.Group>) : (
                    <Button.Group className={styles['button-group']}>
                    <Button onClick = {() => history.push("/register")}>{t("header.register")}</Button>
                    <Button onClick = {() => history.push("/login")}>{t("header.login")}</Button>
                  </Button.Group>
                )
              }

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
            <Menu.Item key = {1} onClick = {() => history.push("/main")}>{t("header.home_page")}</Menu.Item>
            <Menu.Item key = {2}>{t("header.about_page")}</Menu.Item>
          </Menu>
        </div>
    );
};
