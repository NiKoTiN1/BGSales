import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import './app-header.scss';

const AppHeader = (props:any) => {

    return (
        <header className="header">
           {props.checkUser ?  'REG'
                            : <Link className = "header__link"  to='/authorization'>Authorization</Link> }
        </header>
    )
};

const mapStateToProps =  (state: any) =>{
    return {
      checkUser: state.reducer.checkUser,
    }
  }

export default connect(mapStateToProps)(AppHeader);