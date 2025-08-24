import { useFetchSingleListingQuery } from "../slices/listingApiSlice";
import { useGetUserQuery } from "../slices/userAuthSlice";
import Spinner from "../components/Spinner";
import { useNavigate, Link, useParams } from "react-router-dom";
import shareIcon from "../assets/svg/shareIcon.svg";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useRef } from "react";
const SingleListingPage = () => {
  const { id } = useParams();
  const [shareLinkCopied, setShareLinkCopied] = useState("");
  const setShowContactBtn = useRef(false);
  const navigate = useNavigate();
  let imgUrl = import.meta.env.VITE_IMAGES_URL;

  const { data, error, isLoading, isFetching } = useFetchSingleListingQuery(id);
  const {
    data: res,
    error: error2,
    isLoading: isLoading2,
    isFetching: isFetching2,
  } = useGetUserQuery();
  if (!isLoading2 && !isLoading && res) {
    if (res.user._id !== data.listing.userRef) {
      setShowContactBtn.current = true;
    } else {
      setShowContactBtn.current = false;
    }
  } else {
    setShowContactBtn.current = true;
  }
  if (!isLoading2 && res) console.log(res);
  if (!isLoading && !data) return <h1>There is no Listing with this id</h1>;
  if (isLoading || isFetching) return <Spinner />;
  return (
    <main>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {data.listing.imageUrls.map((a, i) => {
          const image = imgUrl + "/" + a.split(" ").join("%20");
          console.log(image);
          return (
            <SwiperSlide key={i}>
              <div
                className="swiperSlideDiv"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "red",
                  width: "100%",
                  height: "400px",
                }}
              ></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt="" />
        {shareLinkCopied && <p className="linkCopied">link Copied!</p>}
      </div>
      <div className="listingDetails">
        <p className="listingName">
          {" "}
          {data.listing.name} - $
          {data.listing.offer
            ? data.listing.discountPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : data.listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className="listingLocation"> {data.listing.address} </p>
        <p className="listingType"> For {data.listing.type} </p>
        {data.listing.offer && (
          <p className="discountPrice">
            {" "}
            $ {data.listing.regularPrice - data.listing.discountPrice}{" "}
          </p>
        )}
        <ul className="listingDetailsList">
          <li>
            {data.listing.bedrooms > 1
              ? `${data.listing.bedrooms} bedrooms`
              : `${data.listing.bedrooms} bedroom`}
          </li>
          <li>
            {data.listing.bedrooms > 1
              ? `${data.listing.bathrooms} bathrooms`
              : `${data.listing.bathrooms} bathroom`}
          </li>
          <li> {data.listing.parking && "Parking Spot"} </li>
          <li> {data.listing.furnished && "Furnished"} </li>
        </ul>
        <p className="listingLocationTilte"> Location </p>
        <div className="leafletContainer">
          <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={[
              data.listing.geoLocation.coordinates[1],
              data.listing.geoLocation.coordinates[0],
            ]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributor"
              url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />
            <Marker
              position={[
                data.listing.geoLocation.coordinates[1],
                data.listing.geoLocation.coordinates[0],
              ]}
            >
              <Popup> {data.listing.address} </Popup>
            </Marker>
          </MapContainer>
        </div>

        {setShowContactBtn.current ? (
          <Link
            className="primaryButton"
            to={`/contact/${data.listing.userRef}?listingName=${data.listing.name}&listingAddress=${data.listing.address}`}
          >
            Contact Landlord
          </Link>
        ) : (
          ""
        )}
      </div>
    </main>
  );
};

export default SingleListingPage;
