import React from 'react';

import styles from './App.module.css';

import { Row, Col } from 'antd'

import { BrowserRouter, Route, Switch} from 'react-router-dom'

import { Redirect} from 'react-router-dom';
import { HomePage, LoginPage, DetailPage, RegisterPage, SearchPage, ShoppingCartPage, ProfilePage} from './pages'

import { useSelector } from './redux/hooks'
import { getProfile } from './redux/profile/slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const routeComponent = (props) => {
    return isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    ); 
  }
  return <Route render={routeComponent} {...rest} />;
}


function App() {
  const jwt = useSelector((s) => s.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getProfile(jwt));
    }
  }, [jwt]);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/detail/:itemcode' component={DetailPage}/>
          <Route path='/search/:keywords' component={SearchPage}/>
          <Route path='/about' component={SearchPage}/>
          <PrivateRoute 
          isAuthenticated={jwt !== null}
          path = '/shoppingCart' component={ShoppingCartPage}/>
          <PrivateRoute
          isAuthenticated={jwt !== null}
          path = '/profile' component={ProfilePage}/>
          <Route render={()=><h1>404 not found ..... to the moon</h1>}/>
          
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
