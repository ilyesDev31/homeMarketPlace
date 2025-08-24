import { useGetAllListingsQuery } from "../slices/listingApiSlice";
import { useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import SingleListing from "../components/SingleListing";
const OffersPage = () => {
  const location = useLocation();
  const { data, error, isLoading, isFetching } = useGetAllListingsQuery();
  console.log(data);
  if (isLoading) return <Spinner />;
  return (
    <div className="offers">
      <header>
        <p className="pageHeader">Offers</p>
      </header>
      <main>
        <ul className="offersList">
          {data.listings.map((a) => (
            <SingleListing key={a._id} data={a} />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default OffersPage;
