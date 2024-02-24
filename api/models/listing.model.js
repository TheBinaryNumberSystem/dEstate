import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    ownType: {
      type: String,
      required: true,
    },
    askingPrice: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    balcony: {
      type: Boolean,
      required: true,
    },
    furnished: {
      type: String,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    readyToMove: {
      type: Boolean,
      required: true,
    },
    negotiation: {
      type: Boolean,
      required: true,
    },
    swimmingPool: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
