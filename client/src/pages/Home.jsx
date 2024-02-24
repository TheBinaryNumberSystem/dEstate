import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import ListingItem from "../components/ListingItem";

function Home() {
  const [readyToMoveListings, setReadyToMoveListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  console.log(saleListings);

  useEffect(() => {
    const fetchReadyToMoveListings = async () => {
      try {
        const res = await fetch("/api/listing/get?readyToMove=true&limit=3");
        const data = await res.json();
        setReadyToMoveListings(data);
        fetchRentListings();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?ownType=rent&limit=3");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?ownType=sell&limit=3");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReadyToMoveListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next perfect <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          dEstate will help you find your home fast, easy and comfortable. Now
          on you don&apos;t <br />
          need any expert support for your next home buy or rent.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let&apos;s start searching...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {readyToMoveListings &&
          readyToMoveListings.length > 0 &&
          readyToMoveListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for readyToMove, sell, rent. */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {readyToMoveListings && readyToMoveListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Properties ready to move
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?readyToMove=true"}
              >
                Show more ready to move properties
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {readyToMoveListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Properties available for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?ownType=rent"}
              >
                Show more properties available for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Properties available for sell
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?ownType=sell"}
              >
                Show more properties available for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
