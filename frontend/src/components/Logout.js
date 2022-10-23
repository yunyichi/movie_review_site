import React from "react";
import { googleLogout } from '@react-oauth/google';


const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Logout({setUser}) {
  const onSuccess = () => {
    googleLogout();  
    setUser(null);
    localStorage.setItem("login", null);  
    console.log('Logout made successfully');
  };
  return (
    <div>
      <googlelogout
      clientId={clientId}
      buttonText="Logout"
      onLogoutSuccess={onSuccess}
      ></googlelogout>
    </div>
  );
}

export default Logout;