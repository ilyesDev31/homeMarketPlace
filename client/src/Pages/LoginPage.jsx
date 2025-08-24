import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { setUser } from "../slices/userSlice";
import { useLoginMutation, useGetUserQuery } from "../slices/userAuthSlice";
import Spinner from "../components/Spinner";
import { useDispatch } from "react-redux";
import Eyes from "../assets/svg/visibilityIcon.svg";
import { toast } from "react-toastify";
const LoginPage = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const { data, error2, isLoading2, isFetching } = useGetUserQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const changeInfo = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  const submitData = async (e) => {
    e.preventDefault();
    if (formData.email === "" && formData.password === "") {
      return toast.error("please enter your login info");
    } else if (formData.password === "") {
      return toast.error("please enter your password");
    } else if (formData.email === "") {
      return toast.error("please enter your email");
    }
    try {
      const res = await login(formData).unwrap();
      dispatch(setUser(res.user));
      const username = res.user.name;
      navigate("/");
      toast.success("welcome " + username);
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  if (data) return <Navigate to="/profile" />;
  return isFetching ? (
    <Spinner />
  ) : (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={submitData}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={changeInfo}
              placeholder="Please Enter Your Email Address"
              className="emailInput"
              id="email"
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Please Enter Your Password"
                value={password}
                onChange={changeInfo}
                name="password"
              />
              <img
                src={Eyes}
                className="showPassword"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password
            </Link>
            <div className="signInBar">
              <p className="signInText">Sign In</p>
              <button className="signInButton" type="submit">
                <ArrowRightIcon fill="#ffff" width="34px" height="34px" />
              </button>
            </div>
          </form>
          <Link className="registerLink" to="/register">
            Sign Up Instead
          </Link>
        </main>
      </div>
    </>
  );
};

export default LoginPage;
