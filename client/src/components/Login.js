import React from "react";
import { Button } from "react-bootstrap";
import HorizonLine from "./HorizonLine";
import GoogleLogin from "react-google-login";

const Login = () => {
  return (
    <div className="d-grid gap-2 my-3">
      <Button variant="info" type="button">
        로그인
      </Button>
      <HorizonLine text={"OR"} />
      <GoogleLogin
        render={(renderProps) => {
          return (
            <Button
              onClick={renderProps.onClick()}
              disabled={renderProps.disabled}
              style={{
                backgroundColor: "#176BEF",
                borderColor: "#176BEF",
              }}
            >
              <i className="fab fa-google">&nbsp;</i>Log In With Google
            </Button>
          );
        }}
      />
    </div>
  );
};

export default Login;
