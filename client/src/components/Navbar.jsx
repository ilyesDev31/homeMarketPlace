import { useLocation } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonIcon } from "../assets/svg/personOutlineIcon.svg";
const Navbar = () => {
  const location = useLocation();
  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <NavLink className="navbarListItem" to="/">
            <ExploreIcon
              fill={location.pathname === "/" ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className={
                location.pathname === "/"
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Explore
            </p>
          </NavLink>
          <NavLink className="navbarListItem" to="/offers">
            <OfferIcon
              fill={location.pathname === "/offers" ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className={
                location.pathname === "/offers"
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Offers
            </p>
          </NavLink>
          <NavLink className="navbarListItem" to="/profile">
            <PersonIcon
              fill={location.pathname === "/profile" ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className={
                location.pathname === "/profile"
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Profile
            </p>
          </NavLink>
        </ul>
      </nav>
    </footer>
  );
};

export default Navbar;
