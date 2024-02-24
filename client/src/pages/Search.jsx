import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    ownType: "",
    parking: false,
    furnished: "",
    readyToMove: false,
    balcony: false,
    swimmingPool: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  // console.log(listing);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const ownTypeFromUrl = urlParams.get("ownType");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const readyToMoveFromUrl = urlParams.get("readyToMove");
    const balconyFromUrl = urlParams.get("balcony");
    const swimmingPoolFromUrl = urlParams.get("swimmingPool");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      ownTypeFromUrl ||
      furnishedFromUrl ||
      readyToMoveFromUrl ||
      balconyFromUrl ||
      swimmingPoolFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        ownType: ownTypeFromUrl || "",
        parking: parkingFromUrl === "true",
        furnished: furnishedFromUrl || "",
        readyToMove: readyToMoveFromUrl === "true",
        balcony: balconyFromUrl === "true",
        swimmingPool: swimmingPoolFromUrl === "true",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };
    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "readyToMove" ||
      e.target.id === "balcony" ||
      e.target.id === "parking" ||
      e.target.id === "swimmingPool"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.name === "ownType") {
      if (e.target.value !== "") {
        setSidebardata({ ...sidebardata, ownType: e.target.value });
      }
    }

    if (e.target.name === "furnished") {
      if (e.target.value !== "") {
        setSidebardata({ ...sidebardata, ownType: e.target.value });
      }
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("ownType", sidebardata.ownType);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("readyToMove", sidebardata.readyToMove);
    urlParams.set("balcony", sidebardata.balcony);
    urlParams.set("swimmingPool", sidebardata.swimmingPool);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="gap-2 flex-wrap items-center">
            <h1 className="text-lg font-semibold">Filter out your search:</h1>
            <label className="font-semibold">
              Do you want to buy or rent a property?
              <select
                name="ownType"
                className="ml-2 border-2 border-black-800 py-2 rounded-md"
                onChange={handleChange}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select type
                </option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </label>
            <div className="flex gap-6 font-semibold">
              <div className="flex flex-col">
                <div className="flex gap-2 p-2">
                  <input
                    type="checkbox"
                    id="readyToMove"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.readyToMove}
                  />
                  <span>Ready To Move</span>
                </div>
                <div className="flex gap-2 p-2">
                  <input
                    type="checkbox"
                    id="parking"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.parking}
                  />
                  <span>Parking spot</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-2 p-2">
                  <input
                    type="checkbox"
                    id="balcony"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.balcony}
                  />
                  <span>Balcony</span>
                </div>
                <div className="flex gap-2 p-2">
                  <input
                    type="checkbox"
                    id="swimmingPool"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.swimmingPool}
                  />
                  <span>Swimming Pool</span>
                </div>
              </div>
            </div>

            <label className="p-2 font-semibold">
              Choose Furnished type:
              <select
                name="furnished"
                className="ml-2 border-2 border-black-800 py-2 rounded-md"
                onChange={handleChange}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select type
                </option>
                <option value="furnished">Fully furnished</option>
                <option value="semifurnished">Semi-furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </label>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <label>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="price_desc">Price high-to-low</option>
              <option value="price_asc">Price low-to-high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button
            // type="submit"
            className="bg-slate-700 text-white p-3 rounded-lg font-semibold uppercase hover:opacity-95 tracking-widest"
          >
            Apply Filter
          </button>
        </form>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Search results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 font-bold hover:underline p-7"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
