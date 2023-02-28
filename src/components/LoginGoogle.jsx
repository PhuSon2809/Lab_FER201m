import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { setLoading } from "../features/login/loginSlide";
const clientId =
  "101940885404-bvmmokm856npmcmvotm9k0ljv79j4qr1.apps.googleusercontent.com";

function LoginGoogle() {
  const dispatch = useDispatch();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = async (res) => {
    dispatch(setLoading());
    console.log(res);
    localStorage.setItem("userLogin", JSON.stringify(res.profileObj));
  };

  const onFailure = (res) => {
    console.log("onFailure", res);
  };

  return (
    <GoogleLogin
      buttonText="Login"
      clientId={clientId}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default LoginGoogle;
