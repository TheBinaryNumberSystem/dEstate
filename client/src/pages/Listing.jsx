import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import BalconyIcon from "@mui/icons-material/Balcony";
import PoolIcon from "@mui/icons-material/Pool";
import HomeIcon from "@mui/icons-material/Home";
import { useSelector } from "react-redux";

function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact] = useState(false);
  const [landlord, setLandlord] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError("Failed to fetch listing");
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching the listing");
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        if (!listing) {
          return;
        }

        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLandlord();
  }, [listing, listing?.userRef]);

  const handleContactLandlord = () => {
    if (landlord) {
      const subject = `Query Regarding Your Property ${listing.name}`;
      const body = "Enter your query here...";
      const mailtoLink = `mailto:${landlord.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      // Redirect to the default mail client
      window.location.href = mailtoLink;
    }
  };

  return (
    <main>
      {loading && <p className="text-center my-7">Loading...</p>}
      {error && <p className="text-center text-red-500 my-7">{error}</p>}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ₹{listing.askingPrice}
              {listing.ownType === "rent" && " / month"}
              {listing.negotiation ? " (Negotiable)" : ""}
            </p>
            <p className="flex items-center mt-6 gap-1 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.ownType === "rent" ? "For Rent" : "For Sale"}
              </p>
            </div>
            <p className="text-slate-800">
              {" "}
              <span className="font-semibold text-black">Description: </span>
              {listing.description}
            </p>

            <ul className="text-green-900 font-semibold text-sm flex items-center gap-4 sm:gap-6 flex-wrap">
              <li className="flex items-center gap-[0.30rem] whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Bedrooms`
                  : `${listing.bedrooms} Bedroom`}
              </li>

              <li className="flex items-center gap-[0.30rem] whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms`
                  : `${listing.bathrooms} Bathroom`}
              </li>

              <li className="flex items-center gap-[0.30rem] whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>

              <li className="flex items-center gap-[0.30rem] whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished === "furnished"
                  ? "Furnished"
                  : listing.furnished === "unfurnished"
                  ? "Unfurnished"
                  : "Semi-furnished"}
              </li>

              <li className="flex items-center gap-[0.30rem] whitespace-nowrap">
                <BalconyIcon className="text-lg" />
                {listing.balcony ? "Balcony" : "No Balcony"}
              </li>

              <li className="flex items-center gap-[0.30rem] whitespace-nowrap">
                <PoolIcon className="text-lg" />
                {listing.swimmingPool ? "Swimming Pool" : "No Swimming Pool"}
              </li>

              <li className="flex items-center gap-[0.30rem] whitespace-nowrap">
                <HomeIcon className="text-lg" />
                {listing.readyToMove ? "Ready to Move" : "Not Ready to Move"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={handleContactLandlord}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact Landlord
              </button>
            )}
          </div>
        </>
      )}
    </main>
  );
}

export default Listing;
