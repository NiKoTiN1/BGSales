import axios from 'axios';
const headers = { 
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};
const registrUser = (newUser:any) => {
    return {
        type: 'REGISTR_USER',
        payload: newUser
    }
}

const postData = (data:any) => {
    return (dispatch:any) => {
        axios(
        {
          method: "POST",
          url: 'https://localhost:5001/api/Account/register', 
          headers:headers,
          data: {...data}
        })
        .then((data:any) => {
            console.log(data);
            //    props.checkUsername(true)
            //   serToken.addToken(data);
            //    setTimeout(()=>props.history.push('/infopage'),900);
        })
        .catch((data:any) => {
            console.log(data);
        })
    }
}

export {
    registrUser,
    postData
};