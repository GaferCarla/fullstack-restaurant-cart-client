import { useEffect} from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";
import NavBar from "./scenes/global/NavBar";
import Footer from "./scenes/global/Footer";
import ItemDetails from "./scenes/itemDetails/itemDetails";
import RestaurantDetails from "./scenes/itemDetails/restaurantDetails";
import CartMenu from "./scenes/global/CartMenu";
import Checkout from "./scenes/checkout/Checkout";
import Search from "./scenes/search/search";
import Confirmation from "./scenes/checkout/Confirmation";
import Newsletter from "./scenes/global/Newsletter";
import Profile from "./scenes/profile/Profile";
import LoginButton from "./scenes/loginLogout/loginbutton";
import LogoutButton from "./scenes/loginLogout/logout";
import { useAuth0 } from "@auth0/auth0-react";
import { Row, Col } from "react-bootstrap";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
  }, [pathname]);

  return null;
}

function App() {
  const {
    // Auth state:
    error,
    isAuthenticated,
    isLoading,
    user,
    // Auth methods:
    getAccessTokenSilently,
    getAccessTokenWithPopup,
    getIdTokenClaims,
    loginWithRedirect,
    loginWithPopup,
    logout,
  } = useAuth0();

  

  
  

  return (
    <div className="app">
      <BrowserRouter>
        
        <Row className="d-flex bg-dark justify-content-end">
          <Col className="col-md-6 "><div className="float-end me-5" >{isAuthenticated ? <LogoutButton /> : <LoginButton />}</div></Col>

        </Row>
        <NavBar/>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="restaurant/:restaurantId" element={<RestaurantDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
        </Routes>
        <CartMenu />
        <Newsletter/>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
