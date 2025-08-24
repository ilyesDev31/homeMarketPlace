import { Link } from "react-router-dom";
import rentCatImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCatImage from "../assets/jpg/sellCategoryImage.jpg";
import HomeSlider from "../components/HomeSlider";
const HomePage = () => {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>
      <main>
        {/* slider */}
        <HomeSlider />
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img src={rentCatImage} alt="rent" className="exploreCategoryImg" />
            <p className="exploreCategoryName">Places for rent</p>
          </Link>
          <Link to="/category/sale">
            <img src={sellCatImage} alt="semm" className="exploreCategoryImg" />
            <p className="exploreCategoryName">Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
