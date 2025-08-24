const router = require("express").Router();

const {
  getAllListings,
  addListing,
  updateSingleListing,
  deleteListing,
  getTopFiveCheapListings,
  getListingsWithin,
  getNearListings,
  uploadListingsImages,
  resizeListingsImages,
  getListingsByCategory,
  getSingleListing,
  getListingsImages,
} = require("../controllers/listingsControllers");
const { protect } = require("../controllers/authControllers");
// get all listings
router.get("/", getAllListings);
// get listings by category
router.get("/category/:category", getListingsByCategory);
// get top five cheap listings
router.get("/top-five-cheap", getTopFiveCheapListings, getAllListings);
// do tasks on single listing

router.post(
  "/add",
  protect,
  uploadListingsImages,
  resizeListingsImages,
  addListing
);
// get listings within
router.get("/within/:dist/center/:latlng/unit/:unit", getListingsWithin);
// get listings near a location
router.get("/near/:latlng/:unit", getNearListings);
router
  .route("/:id")
  .put(protect, updateSingleListing)
  .delete(protect, deleteListing)
  .get(getSingleListing);
module.exports = router;
