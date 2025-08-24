import { useEffect } from "react";
import { useGetUserQuery } from "../slices/userAuthSlice";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { setUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import Spinner from "./Spinner";
const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading, isFetching } = useGetUserQuery();
  console.log(data);
  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setUser(data.user));
    }
  }, [data, isLoading, dispatch]);
  if (error) return <p> {error.data.message} </p>;
  if (isLoading) return <Spinner />;
  if (!isLoading && !data) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default PrivateRoute;
