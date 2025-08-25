import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userAuthSlice";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useUpdateMeMutation } from "../slices/userAuthSlice";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import { useGetUserQuery } from "../slices/userAuthSlice";
import Home from "../assets/svg/homeIcon.svg";
import Spinner from "../components/Spinner";
import { setListing } from "../slices/listingSlice";
import { useDispatch } from "react-redux";
import SingleListing from "../components/SingleListing";
import { setUser } from "../slices/userSlice";
const ProfilePage = () => {
  const [logout] = useLogoutMutation();
  const [updateMe] = useUpdateMeMutation();
  const { data, isLoading, error, isFetching } = useGetUserQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listings } = useSelector((state) => state.listing);
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.user.name,
        email: data.user.email,
      });
      dispatch(setListing(data.user.listing));
    }
  }, [data, dispatch]);
  const { name, email } = formData;
  const logingOut = async (e) => {
    e.preventDefault();
    try {
      const res = await logout().unwrap();
      dispatch(setUser(null));
      navigate("/login");
      window.location = "/login";
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  const updateInfo = async () => {
    try {
      const isValid = email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (!isValid) return toast.error("email is not in a valid format");
      const res = await updateMe(formData).unwrap();
      toast.success("profile updated successfully");
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  const changeFields = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  return isLoading && isFetching ? (
    <Spinner />
  ) : (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={logingOut}>
          Logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && updateInfo();
              setChangeDetails(!changeDetails);
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>
        <div className="profileCard">
          <form onSubmit={updateInfo}>
            <input
              type="text"
              name="name"
              id="name"
              className={changeDetails ? "profileNameActive" : "profileName"}
              disabled={!changeDetails ? true : false}
              value={name}
              onChange={changeFields}
            />
            <input
              type="email"
              name="email"
              id="email"
              className={changeDetails ? "profileEmailActive" : "profileEmail"}
              disabled={!changeDetails ? true : false}
              value={email}
              onChange={changeFields}
            />
          </form>
        </div>
        <Link to="/listings/new" className="createListing">
          <img src={Home} alt="home" />
          <p>Sell or Rent your home</p>
          <img src={arrowRight} alt="go" />
        </Link>
        <>
          <p className="listingText">Your Listings</p>
          <ul className="listingsList">
            {listings.map((a, i) => (
              <SingleListing key={i} data={a} onDelete={true} />
            ))}
          </ul>
        </>
      </main>
    </div>
  );
};

export default ProfilePage;
