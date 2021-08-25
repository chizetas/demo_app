import React from 'react';

import styles from './App.module.css';

import { Row, Col } from 'antd'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { HomePage, SignInPage, DetailPage, RegisterPage} from './pages'

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/signIn' component={SignInPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/detail/:itemcode' component={DetailPage}/>
          <Route render={()=><h1>404 not found ..... to the moon</h1>}/>
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
