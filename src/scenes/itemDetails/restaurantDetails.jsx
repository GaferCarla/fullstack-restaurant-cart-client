import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "../../components/Item";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Elements style
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Breadcrumbs,
  Link,
  Rating,
  Divider
} from "@mui/material";



// Style
import { shades } from "../../theme";

// Bootstrap
import Row from "react-bootstrap/esm/Row";

const RestaurantDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //We're going to grab the item id in the url
  const { itemId, restaurantId } = useParams();

 

  //HOW MANY WE WANT TO ADD TO THE CART

  const [item, setItem] = useState(null);

  //>>>>>>>For future... items related
  const [items, setItems] = useState([]);
  

  //For rating
  const [rating, setRating] = useState();
  //For the tabs
  const [value, setValue] = useState("description");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //sync single item in the same endpoint
  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/restaurants/${restaurantId}?populate=*`,
      {
        method: "GET",
      }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }


  //Related items. Grab the first four items

  //Firts import the items in the shopping list
  async function getItems() {
    const items = await fetch(
      `http://localhost:1337/api/items?populate=*`,
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  


  //Second.
  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps



//FILTER RELATED ITEMS BY SAME RESTAURANT
  const filterbyIdRestaurant = items.filter(
    (item) => item.attributes.restaurant.data.id == restaurantId

  );


  return (
    <>

      <Box width="80%" m="80px auto">
        <Box display="flex" flexWrap="wrap" columnGap="40px">
          {/* IMAGES */}
          <Box flex="1 1 30%" mb="40px">
            <img
              alt={item?.name}
              width="100%"
              height="100%"
              src={`http://localhost:1337${item?.attributes?.logo?.data?.attributes?.formats?.thumbnail?.url}`}
              style={{ objectFit: "contain"}}
            />
          </Box>

          {/* ACTIONS */}
          <Box flex="1 1 60%" mb="40px">
            <Box display="flex" justifyContent="space-between">
              <Breadcrumbs aria-label="breadcrumbs">
                <Link
                  underline="hover"
                  color="neutral"
                  fontSize="inherit"
                  fontWeight="bold" 
                  style={{
                    cursor: "pointer",
                    color:shades.primary[400]              
                  }}                
                  onClick={() => navigate(`/`)}>
                  HOME
                </Link>
                <Typography fontSize="inherit">{item?.attributes?.nameRestaurant}</Typography>
              </Breadcrumbs>
            </Box>

            <Box m="30px 0 25px 0">
              <Typography variant="h2">{item?.attributes?.nameRestaurant}</Typography>
              <Row className="d-flex justify-content-start">
                <Typography >{item?.attributes?.address}</Typography>

              </Row>

            </Box>


            <Box>
              <Box
                m="10px 0"
                sx={{
                  '& > legend': { mt: 2 },
                }}
              >
                <Rating
                  name="simple-controlled"
                  size="large"
                  value={rating}
                  onChange={(event, newRating) => {
                    setRating(newRating);
                  }}
                />
              </Box>
              <Typography>CATEGORÍA: {item?.attributes?.category}</Typography>
            </Box>
          </Box>
        </Box>

        {/* INFORMATION */}
        <Box m="20px 0">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="DESCRIPTION" value="description" />
            <Tab label="REVIEWS" value="reviews" />
          </Tabs>
        </Box>
        <Box display="flex" flexWrap="wrap" gap="15px">
          {value === "description" && (
            <div>{item?.attributes?.description}</div>
          )}
          {value === "reviews" && <div>reviews</div>}
        </Box>

        {/* RELATED ITEMS */}

        <Box mt="65px" width="100%">
        <Divider>
          <Typography variant="h3" fontWeight="bold" textAlign="center">
              NUESTRO MENÚ
          </Typography>
        </Divider>
          <Box className="wrapper py-5 px2">
            
            {filterbyIdRestaurant.map((item, i) => (
              <Item key={`${item.name}-${i}`} item={item} />
            ))}
            
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RestaurantDetails;
