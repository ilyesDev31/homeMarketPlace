import { useRef, useState } from "react";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateListingMutation } from "../slices/listingApiSlice";
const CreateListingPage = () => {
  const [creatListing, { isLoading, error }] = useCreateListingMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "rent",
    name: "this is the first listing",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "Modern 3BR Apartment In FL",
    offer: false,
    regularPrice: 7500,
    discountPrice: 0,
    imageUrls: null,
  });
  const {
    type,
    name,
    bathrooms,
    bedrooms,
    furnished,
    address,
    offer,
    regularPrice,
    discountPrice,
    parking,
    imageUrls,
  } = formData;
  const onChange = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]:
        e.target.value === "true" || e.target.value === "false"
          ? JSON.parse(e.target.value)
          : e.target.value,
    }));
  };

  const subData = async (e) => {
    e.preventDefault();
    const fileData = new FormData();
    Object.keys(formData).forEach((ele) => {
      if (ele !== "imageUrls") {
        fileData.append(ele, formData[ele]);
      }
    });
    formData.imageUrls.forEach((file) => fileData.append("imageUrls", file));
    if (regularPrice <= discountPrice) {
      toast.error("discounted price must be less than the regular price");
      return;
    }
    if (imageUrls.length > 6) {
      toast.error("the max number of images is 6");
      return;
    }
    try {
      const res = await creatListing(fileData).unwrap();
      console.log(res);
      window.location = `/category/${type}`;
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Create a Listing!</p>
      </header>
      <main>
        <form onSubmit={subData}>
          <label className="formLabel">Sell / Rent</label>
          <div className="formButtons">
            <button
              type="button"
              className={type === "sale" ? "formButtonActive" : "formButton"}
              name="type"
              value="sale"
              onClick={onChange}
            >
              Sell
            </button>
            <button
              type="button"
              className={type === "rent" ? "formButtonActive" : "formButton"}
              name="type"
              value="rent"
              onClick={onChange}
            >
              Rent
            </button>
          </div>
          <label className="formLabel">Name</label>
          <input
            type="text"
            value={name}
            name="name"
            onChange={onChange}
            className="formInputName"
            placeholder="Enter the Listing's Name"
            maxLength="32"
            minLength="10"
            required
          />
          <div className="formRooms flex">
            <div>
              <label className="formLabel">Bedrooms</label>
              <input
                type="number"
                className="formInputSmall"
                value={bedrooms}
                name="bedrooms"
                onChange={onChange}
                min="1"
                max="50"
                required
              />
            </div>
            <div>
              <div>
                <label className="formLabel">Bathrooms</label>
                <input
                  type="number"
                  className="formInputSmall"
                  value={bathrooms}
                  name="bathrooms"
                  onChange={onChange}
                  min="1"
                  max="20"
                  required
                />
              </div>
            </div>
          </div>
          <label className="formLabel">Parking Spot</label>
          <div className="formButtons">
            <button
              type="button"
              className={
                parking && parking !== null ? "formButtonActive" : "formButton"
              }
              value={true}
              onClick={onChange}
              name="parking"
            >
              Yes
            </button>
            <button
              type="button"
              name="parking"
              value={false}
              onClick={onChange}
              className={
                !parking && parking !== null ? "formButtonActive" : "formButton"
              }
            >
              No
            </button>
          </div>
          <label className="formLabel">Furnished</label>
          <div className="formButtons">
            <button
              type="button"
              className={
                furnished && furnished !== null
                  ? "formButtonActive"
                  : "formButton"
              }
              value={true}
              onClick={onChange}
              name="furnished"
            >
              Yes
            </button>
            <button
              type="button"
              className={
                !furnished && furnished !== null
                  ? "formButtonActive"
                  : "formButton"
              }
              value={false}
              onClick={onChange}
              name="furnished"
            >
              No
            </button>
          </div>
          <label className="formLabel">Address</label>
          <textarea
            name="address"
            value={address}
            onChange={onChange}
            required
            type="text"
            className="formInputAddress"
            placeholder="Enter the Listing's Address"
          ></textarea>
          <label className="formLabel">Offer</label>
          <div className="formButtons">
            <button
              type="button"
              className={offer ? "formButtonActive" : "formButton"}
              value={true}
              onClick={onChange}
              name="offer"
            >
              Yes
            </button>
            <button
              type="button"
              className={!offer ? "formButtonActive" : "formButton"}
              value={false}
              onClick={onChange}
              name="offer"
            >
              No
            </button>
          </div>
          <label className="formLabel">Regular Price</label>
          <div className="formPriceDiv">
            <input
              type="number"
              className="formInputSmall"
              name="regularPrice"
              value={regularPrice}
              onChange={onChange}
              min="50"
              max="7500000"
              required
            />
            {type === "rent" && <p className="formPriceText"> $ / Month </p>}
          </div>
          {offer && (
            <>
              <label className="formLabel">Discounted Price</label>
              <input
                type="Number"
                className="formInputSmall"
                name="discountPrice"
                value={discountPrice}
                onChange={onChange}
                min="50"
                max="7500000"
                required={offer}
              />
            </>
          )}
          <label className="formLabel">Images</label>
          <p className="imagesInfo">
            The first image will be the cover (max 6).
          </p>
          <input
            type="file"
            className="formInputFile"
            name="imageUrls"
            onChange={(e) =>
              setFormData({
                ...formData,
                imageUrls: Array.from(e.target.files),
              })
            }
            max="6"
            accept=".jpg,.png,.jpeg"
            multiple
            required
          />
          <button type="submit" className="primaryButton createListingButton">
            Create Listing
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateListingPage;
