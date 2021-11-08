import React, { Suspense, useEffect}from 'react'
import {connect} from 'react-redux';
import { Route, Switch} from 'react-router-dom';
import AppHeader from '../app-header';
import AppFooter from '../app-footer';
import {refreshToken} from '../../actions';
import {MainPage, LoginPage, RegistretionPage} from '../pages/index'
import PropsAppInterface from '../../interfaces/PropsAppInterface';
import './app.scss';

const App = ({dispatch}:PropsAppInterface) => {
  useEffect(()=>{
    dispatch(refreshToken());
  })
  return (
    <div className='main-content'>
      <AppHeader/>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route  path = '/authorization' exact component={LoginPage}/>
          <Route  path = '/registration' exact component={RegistretionPage}/>
          <Route path='/' exact component={MainPage}/>
        </Switch>
      </Suspense>
      <AppFooter />
    </div>
  )
}

export default connect()(App) ;