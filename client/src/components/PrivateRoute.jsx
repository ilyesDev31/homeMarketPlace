import { useEffect } from "react";
import { useGetUserQuery } from "../slices/userAuthSlice";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { setUser } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
const PrivateRoute = () => {
  const { profile } = useSelector((state) => state.user);
  return profile ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
