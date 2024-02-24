import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import PropTypes from "prop-types";
import { FaBath, FaBed, FaChair, FaParking } from "react-icons/fa";
import BalconyIcon from "@mui/icons-material/Balcony";
import PoolIcon from "@mui/icons-material/Pool";

function ListingItem({ listing }) {
  // console.log(listing);
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700">{listing.name}</p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-justify text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-700 mt-2 font-semibold">
            ₹ {listing.askingPrice.toLocaleString("en-IN")}
            {listing.ownType === "rent" && " / month"}
          </p>
          <div className="text-slate-700 flex gap-2 flex-wrap  justify-between">
            <div className="font-bold text-xs flex gap-1">
              <FaBed className="text-sm" />
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : `${listing.bedrooms} Bedroom`}
            </div>
            <div className="font-bold text-xs flex gap-1">
              <FaBath className="text-sm" />
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : `${listing.bathrooms} Bathroom`}
            </div>
            <div className="font-bold text-xs flex gap-1">
              <FaParking className="text-sm" />
              {listing.parking ? "Parking Spot" : "No Parking"}
            </div>
            <div className="font-bold text-xs flex gap-1">
              <FaChair className="text-sm" />
              {listing.furnished === "furnished"
                ? "Furnished"
                : listing.furnished === "unfurnished"
                ? "Unfurnished"
                : "Semi-furnished"}
            </div>
            <div className="font-bold text-xs flex gap-1">
              <BalconyIcon sx={{ fontSize: 18 }} />
              {listing.balcony ? "Balcony" : "No Balcony"}
            </div>
            <div className="font-bold text-xs flex gap-1">
              <PoolIcon sx={{ fontSize: 18 }} />
              {listing.swimmingPool ? "Swimming Pool" : "No Swimming Pool"}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

ListingItem.propTypes = {
  listing: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    askingPrice: PropTypes.number.isRequired,
    ownType: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    parking: PropTypes.string.isRequired,
    furnished: PropTypes.string.isRequired,
    balcony: PropTypes.bool.isRequired,
    swimmingPool: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ListingItem;
