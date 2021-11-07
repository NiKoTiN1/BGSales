import React, { Suspense, useEffect}from 'react'
import {connect} from 'react-redux';
import { Route, Switch} from 'react-router-dom';
import AppHeader from '../app-header';
import {refreshToken} from '../../actions';
import {MainPage, LoginPage, RegistretionPage} from '../pages/index'
import PropsAppInterface from '../../interfaces/PropsAppInterface';
import './app.scss';

const App = ({dispatch}:PropsAppInterface) => {
  useEffect(()=>{
    dispatch(refreshToken());
  })
  return (
    <div>
      <AppHeader/>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route  path = '/authorization' exact component={LoginPage}/>
          <Route  path = '/registration' exact component={RegistretionPage}/>
          <Route path='/' exact component={MainPage}/>
        </Switch>
      </Suspense>
    </div>
  )
}

export default connect()(App) ;