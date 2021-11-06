import axios from 'axios';
const addProfileUser = (newUser:any) => {
    return {
        type: 'PROFILE_USER',
        payload: newUser
    }
}
const addCheckUser = (checkUser:any) => {
    return {
        type: 'ADD_CHECK',
        payload: checkUser
    }
}
const addToken = (data:any) => {
    localStorage.setItem("acessToken", data.data.accessToken)
    localStorage.setItem("refreshToken", data.data.refreshToken)
}
const postData = (user:any) => {
    return (dispatch:any) => {
        const formCheck = new FormData();
        formCheck.append('FirstName', user.FirstName);
        formCheck.append('LastName', user.LastName);
        formCheck.append('UserType', user.UserType);
        formCheck.append('Email', user.Email);
        formCheck.append('Password', user.Password);
        axios(
        {
          method: "POST",
          url: 'https://localhost:5001/api/Account/register', 
          data: formCheck
        })
        .then((data:any) => {
            addToken(data);
            dispatch(addCheckUser(true));
        })
        .catch((data:any) => {
            console.log(data);
        })
    }
}
const postProfileData = (user:any) => {
    return (dispatch:any) => {
        const formCheck = new FormData();
        formCheck.append('Email', user.Email);
        formCheck.append('Password', user.Password);
        axios(
        {
          method: "POST",
          url: 'https://localhost:5001/api/Account/login', 
          data: formCheck
        })
        .then((data:any) => {
            //dispatch(registrUser());
            addToken(data);
            dispatch(addCheckUser(true));
        })
        .catch((data:any) => {
            console.log(data);
        })
    }
}
const refreshToken = () => {
    return (dispatch:any) => {
        axios(
        {
          method: "PUT",
          url: 'https://localhost:5001/api/Token/refresh', 
        })
        .then((data:any) => {
            addToken(data);
            dispatch(addCheckUser(true));
        })
        .catch((data:any) => {
            localStorage.removeItem('acessToken');
            localStorage.removeItem('refreshToken');
            dispatch(addCheckUser(false));
        })
    }
}
export {
    refreshToken,
    addCheckUser,
    postProfileData,
    postData
};