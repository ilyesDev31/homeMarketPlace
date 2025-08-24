const Listing = require("../models/Listing");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const catchAsync = require("../middleware/catchAsync");
const apiFeatures = require("../utils/apiFeatures");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb(true, null);
  } else {
    cb(false, "please select a valid image file");
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadListingsImages = upload.fields([
  { name: "imageUrls", maxCount: 6 },
]);
exports.resizeListingsImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  console.log(req.files);
  const imageUrls = [];
  let name = "";
  for (let i = 0; i < req.files.imageUrls.length; i++) {
    name = `${req.body.name}-${Date.now()}-image-${i + 1}.jpeg`;
    imageUrls.push(name);
    await sharp(req.files.imageUrls[i].buffer)
      .resize(1200, 1000)
      .toFormat("jpeg")
      .toFile(`public/${name}`);
  }
  req.body.imageUrls = imageUrls;
  next();
});
// get all listings
exports.getAllListings = catchAsync(async (req, res, next) => {
  let listings = new apiFeatures(Listing.find(), req.query)
    .filter()
    .sort()
    .select()
    .paginate();
  listings = await listings.model;
  if (!listings) return next(new ErrorResponse("no listings found", 400));
  res.status(200).json({
    status: "success",
    length: listings.length,
    listings,
  });
});
// get listings by category
exports.getListingsByCategory = catchAsync(async (req, res) => {
  let cat = "";
  let listings;
  if (req.params.category === "rent") {
    cat = "rent";
  } else if (req.params.category === "sale") {
    cat = "sale";
  } else
    return next(
      new ErrorResponse(
        `there is no category called ${req.params.category}`,
        404
      )
    );
  const length = await Listing.find({ type: cat });
  listings = new apiFeatures(Listing.find({ type: cat }), req.query).paginate();
  listings = await listings.model;
  res.status(200).json({
    status: "success",
    length: length.length,
    listings,
  });
});
// add listing
exports.addListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.create({ ...req.body, userRef: req.user._id });

  res.status(200).json({
    status: "success",
    listing,
  });
});
// get single listing
exports.getSingleListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(new ErrorResponse("no listing with this id", 404));
  let id = "";

  res.status(200).json({
    status: "success",
    listing,
  });
});
// update listing
exports.updateSingleListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (listing.userRef.toString() !== req.user.id && req.user.role !== "admin")
    return next(
      new ErrorResponse("you are not authorized to update this listing")
    );
  const list = await Listing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    list,
  });
});
// delete single listing
exports.deleteListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (listing.userRef.toString() !== req.user.id && req.user.role !== "admin")
    return next(
      new ErrorResponse("you are not authorized to delete this listing")
    );
  await Listing.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "successfully deleted",
  });
});
// get top five cheap listings
exports.getTopFiveCheapListings = (req, res, next) => {
  req.query = {
    sort: "price,ratingsAverage",
    limit: 5,
  };
  next();
};
// get listings within
exports.getListingsWithin = catchAsync(async (req, res, next) => {
  const { dist, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");
  const radius = unit === "km" ? dist / 6371 : dist / 3959;

  const listings = await Listing.find({
    geoLocation: {
      $geoWithin: { $centerSphere: [[lat, lng], radius] },
    },
  });
  res.status(200).json({
    status: "success",
    length: listings.length,
    listings,
  });
});
// get near listings
exports.getNearListings = catchAsync(async (req, res, next) => {
  const { latlng } = req.params;
  const [lat, lng] = latlng.split(",");
  const listings = await Listing.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates: [+lat, +lng] },

        distanceField: "dist/m",
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    length: listings.length,
    listings,
  });
});
