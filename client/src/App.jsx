import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import OffersPage from "./Pages/OffersPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ForgotPassword from "./Pages/ForgotPasswordPage";
import Layout from "./components/layout/Layout";
import PrivateRoute from "./components/PrivateRoute";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import CategoryPage from "./Pages/CategoryPage";
import CreateListingPage from "./Pages/CreateListingPage";
import SingleListingPage from "./Pages/SingleListingPage";
import ContactLandLordPage from "./Pages/ContactLandLordPage";
const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/listings/new" element={<CreateListingPage />} />
        </Route>
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/category/:cat/:id" element={<SingleListingPage />} />
        <Route path="/contact/:userId" element={<ContactLandLordPage />} />
      </Route>
    </>
  )
);
// localStorage.setItem(
//   "userInfo",
//   JSON.stringify({
//     name: "ilyes",
//     email: "ibendjellal8@gmail.com",
//     role: "user",
//   })
// );
const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
