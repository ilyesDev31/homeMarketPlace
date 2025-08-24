import { Swiper, SwiperSlide } from "swiper/react";
import { useGetAllListingsQuery } from "../slices/listingApiSlice";
import { useNavigate } from "react-router-dom";
const HomeSlider = () => {
  const { data, isLoading, error, isFetching } = useGetAllListingsQuery();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_IMAGES_URL;
  console.log(data);
  if (isLoading && !data) return "Loading ...";
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      {data.listings.map((a, i) => (
        <SwiperSlide
          key={i}
          onClick={() => navigate(`/category/${a.type}/${a._id}`)}
        >
          <div
            className="swiperSlideDiv"
            style={{
              backgroundImage: `url(${url}/${a.imageUrls[0]
                .split(" ")
                .join("%20")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "red",
              width: "100%",
              height: "400px",
              cursor: "pointer",
            }}
          >
            <p className="swiperSlideText"> {a.name} </p>
            <p className="swiperSlidePrice">
              ${a.discountPrice ?? a.regularPrice}
              {a.type === "rent" && " / month"}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeSlider;
