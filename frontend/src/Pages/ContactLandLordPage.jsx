import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../slices/userApiSlice";
const ContactLandLordPage = () => {
  const { userId } = useParams();
  const { data, error, isLoading, isFetching } = useGetUserByIdQuery(userId);
  console.log(data);
  const [message, setMessage] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Landlord</p>
        {!isLoading && data && (
          <main>
            <div className="contactLandlord">
              <p className="landlordName">Contact {data.user.name} </p>
            </div>
            <form className="messageForm">
              <div className="messageDiv">
                <label htmlFor="message" className="messageLabel">
                  Message
                </label>
                <textarea
                  name="message"
                  className="textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <a
                href={`mailto:${data.user.email}?Subject=${searchParams.get(
                  "listingName"
                )}&body=${message}`}
              >
                <button type="button" className="primaryButton sendMsg">
                  Send Message
                </button>
              </a>
            </form>
          </main>
        )}
      </header>
    </div>
  );
};

export default ContactLandLordPage;
