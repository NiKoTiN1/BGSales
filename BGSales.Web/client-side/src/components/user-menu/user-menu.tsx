import React, { useState } from 'react';
import {connect} from 'react-redux';
import './user-menu.scss';
import { Button } from '@material-ui/core';
import {addCheckUser} from '../../actions';
import {imageSrc} from '../../imageRequire';
import PropsUserMenuInterface from '../../interfaces/PropsUserMenuInterface';

const UserMenu = ({dispatch}:PropsUserMenuInterface) => {
    const [userMenu, setUserMenu] = useState(false);
    const logOut = () => {
      dispatch(addCheckUser(false));
      localStorage.removeItem('accessToken');
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
export default connect()(UserMenu);