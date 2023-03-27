import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout, user } = useAuth0();


  return (
    <>
      <button
        className="btn text-white btn-dark float-end me-5"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
      <span style={{fontSize:"16px"}}  className="text-white float-end me-3 mt-2">Hola {user.name}</span>

    </>
  );
};

export default LogoutButton;
