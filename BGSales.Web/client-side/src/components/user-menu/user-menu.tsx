import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import './user-menu.scss';
import { Button } from '@material-ui/core';
import {addCheckUser} from '../../actions';

const UserMenu = (props:any) => {
    const [userMenu, setUserMenu] = useState(false);
    const imageSrc = require('../../assets/images.png')
    const logOut = () => {
      props.dispatch(addCheckUser(false));
      localStorage.removeItem('acessToken');
      localStorage.removeItem('refreshToken');
    };
    return (
        <div>
          <p><img className="user-menu__img" src={imageSrc} alt="" onClick={()=>setUserMenu(!userMenu)}/></p>
          {userMenu
          ? <div className="user-menu__select">
              <div>
                <Button className="user-menu__select_btn" variant="contained">Profile</Button>
              </div> 
              <div>
                <Button className="user-menu__select_btn_exit" variant="contained" onClick={() => logOut()}>Exit</Button>
              </div> 
            </div> 
          : null
          }
        </div> 
    )
};

const mapStateToProps =  (state: any) =>{
    return {
      checkUser: state.reducer.checkUser,
    }
  }

export default connect(mapStateToProps)(UserMenu);