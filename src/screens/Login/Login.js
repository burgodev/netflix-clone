import React, { useState } from "react";
import "./Login.css";
import "../../App.css";
import SignupScreen from "../SignupScreen/SignupScreen";

function Login() {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="loginScreen">
      <div className="loginScreenBackground">
        <img
          className="loginScreenLogo"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="Netflix"
        />
        <button onClick={() => setSignIn(true)} className="loginScreenButton">
          Sign In
        </button>

        <div className="loginScreenGradient" />
        <div className="loginScreenBody">
          {signIn ? (
            <SignupScreen />
          ) : (
            <>
              <h1>Unlimited films, TV programmes and more.</h1>
              <h2>Watch anywhere. Cancel at any time.</h2>
              <h3>
                Ready to watch? Enter your email to create or restart your
                membership.
              </h3>
              <div className="loginScreenInput">
                <form>
                  <input type="email" placeholder="Email Address" />
                  <button
                    onClick={() => setSignIn(true)}
                    className="loginScreenGetStarted"
                  >
                    GET STARTED
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
