import DeleteIcon from "../assets/svg/DeleteIcon.svg?react";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathIcon from "../assets/svg/bathtubIcon.svg";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { useDeleteListingMutation } from "../slices/listingApiSlice";
import { toast } from "react-toastify";
import { deleteListingAct } from "../slices/listingSlice";
import { useDispatch } from "react-redux";
const img = import.meta.env.VITE_IMAGES_URL;
const SingleListing = ({ data, onDelete }) => {
  const [deleteListing, { error, isLoading }] = useDeleteListingMutation();
  const dispatch = useDispatch();
  const {
    _id,
    address,
    name,
    offer,
    discountPrice,
    regularPrice,
    type,
    bedrooms,
    bathrooms,
    imageUrls,
  } = data;
  const deleteSingleListing = async (e) => {
    e.preventDefault();
    try {
      const res = await deleteListing(_id).unwrap();
      dispatch(deleteListingAct(_id));
      toast.success("listing deleted successfully");
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  if (!data) return <Spinner />;
  return (
    <>
      <li className="categoryListing">
        <Link className="categoryListingLink" to={`/category/${type}/${_id}`}>
          <img
            src={`${img}/${imageUrls[0]}`}
            alt={name}
            className="categoryListingImg"
          />
          <div className="categoryListingDetails">
            <p className="categoryListingLocation">{address}</p>
            <p className="categoryListingName"> {name} </p>
            <p className="categoryListingPrice">
              $
              {offer
                ? discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {type === "rent" && " / Month"}
            </p>
            <div className="categoryListingInfoDiv">
              <img src={bedIcon} alt="bed" />
              <p className="categoryListingInfoText">
                {bedrooms > 1 ? `${bedrooms} bedrooms` : `1 bedroom`}
              </p>
              <img src={bathIcon} alt="bath" />
              <p className="categoryListingInfoText">
                {bathrooms > 1 ? `${bathrooms} bathrooms` : `1 bathroom`}
              </p>
            </div>
          </div>
        </Link>
        {onDelete && (
          <DeleteIcon
            className="removeIcon"
            fill="rgb(231,76,60)"
            onClick={deleteSingleListing}
          />
        )}
      </li>
    </>
  );
};

export default SingleListing;
