import React, {useEffect}from 'react'
import {connect} from 'react-redux';
import {refreshToken} from '../../actions';
import PropsAppInterface from '../../interfaces/PropsAppInterface';
import './main.scss';

const Main = ({dispatch}:PropsAppInterface) => {
  useEffect(()=>{
    dispatch(refreshToken());
  })
  return (
    <>
      <div className="cards">
        <div className="card-1 card">
          <div className="card-1__image image">
            <div className="data">
              <div className="content">
                <h1 className="title">Boxing icon has the will for a couple more fights</h1>
                <p className="text">The highly anticipated world championship fight will take place at 10am and is the second major boxing blockbuster in the nation after 43 years.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-2 card">
          <div className="card-2__image image">
            <div className="data">
              <div className="content">
                <h1 className="title">Boxing icon has the will for a couple more fights</h1>
                <p className="text">The highly anticipated world championship fight will take place at 10am and is the second major boxing blockbuster in the nation after 43 years.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="info">
        <label className="info__label">Thanks to this site, many media personalities were able to get decent pay, 
          and advertisers gained new customers through advertising media personalities.</label>
      </div>
      <div className="button-container">
          <a href="/authorization" className="button-container__pressed">Start now</a>
      </div>
    </>
  )
}

export default connect()(Main) ;