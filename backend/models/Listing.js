const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/GeoCoding");
const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a listing's name"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "please add the listing's type"],
      enum: {
        values: ["rent", "sale", "buy"],
        message: "listing type must be either rent sale or buy",
      },
    },
    userRef: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    bedrooms: {
      type: Number,
      required: [true, "please add bedrooms number"],
      default: 1,
    },
    bathrooms: {
      type: Number,
      required: [true, "please add a bathrooms number"],
      default: 1,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    offer: {
      type: Boolean,
      default: false,
    },
    regularPrice: {
      type: Number,
      required: [true, "please add the price"],
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      required: [true, "please add the exact address of the house"],
    },
    geoLocation: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
    },
    imageUrls: [String],
    slugify: String,
    id: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
listingSchema.index({ geoLocation: "2dsphere" });
listingSchema.pre("aggregate", function (next) {
  next();
});
listingSchema.pre("save", async function (next) {
  try {
    this.id = this._id.toString();
    this.slug = slugify(this.name, { toUpper: true });
    const res = await geocoder.geocode(this.address);
    this.geoLocation = {
      type: "Point",
      coordinates: [res[0].longitude, res[0].latitude],
    };
    next();
  } catch (error) {
    console.log(error.message);
  }
});
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
