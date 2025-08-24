import { Navigate, useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { useGetListingByCategoryQuery } from "../slices/listingApiSlice";
import { setListing } from "../slices/listingSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import SingleListing from "../components/SingleListing";
import { useState } from "react";
const CategoryPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { category } = useParams();
  const { listings } = useSelector((state) => state.listing);
  const { data, error, isLoading, isFetching } = useGetListingByCategoryQuery({
    category,
    limit,
    page,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && !error) dispatch(setListing(data.listings));
  }, [data, error, dispatch]);
  console.log(data);
  if (category !== "rent" && category !== "sale") return <NotFoundPage />;
  if (isLoading) return <Spinner />;
  return (
    <div className="category">
      <header>
        <p className="pageHeader">{`Places for ${category
          .slice(0, 1)
          .toUpperCase()}${category.slice(1, category.length)}`}</p>
        {isLoading ? (
          <Spinner />
        ) : listings && listings.length > 0 ? (
          <>
            <main>
              <ul className="categoryList">
                {listings.map((a) => (
                  <SingleListing key={a._id} data={a} />
                ))}
              </ul>
            </main>
            <br />
            <br />
            {limit <= data.length && (
              <p
                className="loadMore"
                onClick={() => {
                  if (limit >= data.length) {
                    setLimit(limit - 10);
                  } else {
                    setLimit(limit + 10);
                  }
                }}
              >
                {limit >= data.length ? "Show less" : "Show more"}
              </p>
            )}
          </>
        ) : (
          <p>No Listings for {category}</p>
        )}
      </header>
    </div>
  );
};

export default CategoryPage;
