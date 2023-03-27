import MainCarousel from "./MainCarousel.jsx";
import ShoppingList from "./ShoppingList.jsx";
import RestaurantList from "./RestaurantList.jsx"

const Home = () => {
    return <div className="home">
        <MainCarousel/>
        <RestaurantList/>
        <ShoppingList/>
        
        
    </div>

}

export default Home;