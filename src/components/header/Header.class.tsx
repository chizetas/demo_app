import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { RootState } from "../../redux/store";
import {LanguageState} from "../../redux/language/languageReducer"
import { withTranslation, WithTranslation } from "react-i18next"
import { changeLanguageActionCreator} from "../../redux/language/languageActions"
import { connect } from "react-redux"
import { Dispatch } from "redux";

// interface State extends LanguageState {}

const mapStateToProps = (state : RootState) => {
  return {
    language: state.language.language,
    languageList: state.language.languageList
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (code: "zh" | "en") => {
      const action = changeLanguageActionCreator(code);
      dispatch(action);
    },
  }
};

type PropsType = RouteComponentProps & // react-route
  WithTranslation & // i18n
  ReturnType<typeof mapStateToProps> & // redux store
  ReturnType<typeof mapDispatchToProps>;

class HeaderComponent extends React.Component<PropsType>{

  // ** replaced with react- redux
  //
  // constructor(props) {
  //   super(props);
  //   const storeState = store.getState();
  //   this.state = {
  //     language: storeState.language,
  //     languageList: storeState.languageList,
  //   };
  //   store.subscribe(this.handleStoreChange);
  // }

  // handleStoreChange = () => {
  //   const storeState = store.getState();
  //   this.setState({
  //     language: storeState.language,
  //   });
  // }

  menuClickHandler = (e) => {
      console.log(e);

      // const action =  changeLanguageActionCreator(e.key)
      // store.dispatch(action);

      this.props.changeLanguage(e.key)

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
                      {this.props.languageList.map(l => {
                        return <Menu.Item key = {l.code}>{l.name}</Menu.Item>;
                      })}
                  </Menu>
                }
                icon={<GlobalOutlined></GlobalOutlined>}
              >
                {this.props.language === "zh" ? "中文" : "English"}
              </Dropdown.Button>
              <Button.Group className={styles['button-group']}>
                <Button onClick = {() => history.push("/profile")}>{t("header.profile")}</Button>
                <Button onClick = {() => history.push("/register")}>{t("header.register")}</Button>
                <Button onClick = {() => history.push("/login")}>{t("header.login")}</Button>
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

export const Header = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent)));
