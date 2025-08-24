import { useEffect, useState } from "react";
import Eyes from "../assets/svg/visibilityIcon.svg";
import { Link, Navigate } from "react-router-dom";
import ArrowRightIcon from "../assets/svg/keyboardArrowRightIcon.svg?react";
import { useNavigate } from "react-router-dom";
import {
  useCheckPasswordTokenQuery,
  useResetPasswordMutation,
  useGetUserQuery,
} from "../slices/userAuthSlice";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams();
  const { data, error, isLoading, isFetching } =
    useCheckPasswordTokenQuery(token);
  const [resetPassword, { isLoading2, error2 }] = useResetPasswordMutation();
  const { data3, error3, isLoading3 } = useGetUserQuery();

  const navigate = useNavigate();
  console.log(data, error, token);
  useEffect(() => {
    if (!data && error) {
      navigate("/notFound");
    }
  }, [data, navigate, error]);
  const submitData = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword({
        password,
        confirmPassword,
        url: token,
      }).unwrap();
      navigate("/login");
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  if (data) return <Navigate to="/profile" />;
  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Reset Your Password!</p>
        </header>
        <main>
          <form onSubmit={submitData}>
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Please Enter Your Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
              />
              <img
                src={Eyes}
                className="showPassword"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="passwordInputDiv">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Please Enter Your Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                name="password"
              />
              <img
                src={Eyes}
                className="showPassword"
                onClick={() => setShowConfirmPassword(!showPassword)}
              />
            </div>
            <div className="rem">
              <p>Remember your Password!</p>
              <Link to="/login" className="forgotPasswordLink">
                Login
              </Link>
            </div>
            <div className="signInBar">
              <p className="signInText">Change Password</p>
              <button className="signInButton" type="submit">
                <ArrowRightIcon fill="#ffff" width="34px" height="34px" />
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default ResetPasswordPage;
