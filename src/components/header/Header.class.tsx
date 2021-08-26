import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { withRouter, RouteComponentProps } from "react-router-dom";
import store, { RootState } from "../../redux/store";
import {LanguageState} from "../../redux/language/languageReducer"
import { withTranslation, WithTranslation } from "react-i18next"
import { changeLanguageActionCreator} from "../../redux/language/languageActions"
import { connect } from "react-redux"
interface State extends LanguageState {}

const mapStateToProps = (state : RootState) => {
  return {
    language: state.language,
    languageList: state.languageList
  }
}

class HeaderComponent extends React.Component<RouteComponentProps & WithTranslation, State>{

  constructor(props) {
    super(props);
    const storeState = store.getState();
    this.state = {
      language: storeState.language,
      languageList: storeState.languageList,
    };
    store.subscribe(this.handleStoreChange);
  }

  handleStoreChange = () => {
    const storeState = store.getState();
    this.setState({
      language: storeState.language,
    });
  }

  menuClickHandler = (e) => {
      console.log(e);

      const action =  changeLanguageActionCreator(e.key)
      store.dispatch(action);

  };

  render() {
    const { history, t} = this.props;
      return (
        <div className={styles['app-header']}>
          {/* top-header */}
          <div className={styles['top-header']}>
            <div className={styles.inner}>
              <Typography.Text>Make World Better</Typography.Text>
              <Dropdown.Button
                style={{ marginLeft: 15 }}
                overlay={
                  <Menu onClick={this.menuClickHandler}>
                      {this.state.languageList.map(l => {
                        return <Menu.Item key = {l.code}>{l.name}</Menu.Item>;
                      })}
                  </Menu>
                }
                icon={<GlobalOutlined></GlobalOutlined>}
              >
                {this.state.language === "zh" ? "中文" : "English"}
              </Dropdown.Button>
              <Button.Group className={styles['button-group']}>
                <Button onClick = {() => history.push("register")}>{t("header.register")}</Button>
                <Button onClick = {() => history.push("login")}>{t("header.login")}</Button>
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
  }



}

export const Header = connect(mapStateToProps)(withTranslation()(withRouter(HeaderComponent)));
