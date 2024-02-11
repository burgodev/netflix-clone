import React, { useRef } from "react";
import "./SignupScreen.css";
import "../../App.css";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { login } from "../../state/userSlice";
import { useNavigate } from "react-router-dom";

function SignupScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((userAuth) => {
        dispatch(
          login({
            uid: userAuth.user.multiFactor.user.uid,
            email: userAuth.user.multiFactor.user.email,
          })
        );
        return navigate("/");
      })
      .catch((e) => alert(e.message));
  };
  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Password" type="password" ref={passwordRef} />
        <button type="submit" onClick={signIn}>
          Sign in
        </button>
        <h4>
          <span className="signupScreenGray">New to Netflix? </span>
          <span className="signupScreenLink" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignupScreen;
