import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../slices/userAuthSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { useForgotPasswordMutation } from "../slices/userAuthSlice";
const ForgotPasswordPage = () => {
  const { data, error, isLoading, isFetching } = useGetUserQuery();
  const [forgotPassword, { isLoading2, error2 }] = useForgotPasswordMutation();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const onChange = (e) => setEmail(e.target.value);
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      console.log(email);
      const res = await forgotPassword({ email }).unwrap();

      toast.success("a password recovery email is sent tou you");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };
  if (data && !isFetching) return <Navigate to="/" />;

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password!</p>
      </header>
      <main>
        <form onSubmit={submitForm}>
          <input
            type="email"
            className="emailInput"
            id="email"
            value={email}
            placeholder="Please Enter Your Email Address"
            onChange={onChange}
          />
          <Link className="forgotPasswordLink" to="/login">
            Sign In
          </Link>
          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton" type="submit">
              <ArrowRightIcon fill="#f1f1f1" height="34px" width="34px" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
