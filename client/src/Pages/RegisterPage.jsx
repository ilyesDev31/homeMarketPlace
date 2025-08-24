import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ArrowRightIcon from "../assets/svg/keyboardArrowRightIcon.svg";
import Eyes from "../assets/svg/visibilityIcon.svg";
import { useGetUserQuery, useRegisterMutation } from "../slices/userAuthSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { data, error, isLoading, isFetching } = useGetUserQuery();
  const [register, { isLoading2, error2 }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;
  const changeInfo = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  const submitData = async (e) => {
    e.preventDefault();
    try {
      const res = await register(formData).unwrap();
      navigate("/");
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  if (data) return <Navigate to="/profile" />;
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome !</p>
        </header>
        <main>
          <form onSubmit={submitData}>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Please Enter Your Full Name"
              className="nameInput"
              onChange={changeInfo}
            />
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
            <div className="passwordInputDiv">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Please Enter Your Password"
                value={confirmPassword}
                onChange={changeInfo}
                name="confirmPassword"
              />

              <img
                src={Eyes}
                className="showPassword"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            <div className="signUpBar">
              <p className="signUpText">Register</p>
              <button className="signUpButton" type="submit">
                <ArrowRightIcon fill="#ffff" width="34px" height="34px" />
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default RegisterPage;
