import React, { Suspense, lazy, useEffect}from 'react'
import {connect} from 'react-redux';
import { Route, Switch,Redirect} from 'react-router-dom';
import AppHeader from '../app-header';
import {MainPage, LoginPage, RegistretionPage} from '../pages/index'
import './app.scss';

const App = (props:any) => {
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