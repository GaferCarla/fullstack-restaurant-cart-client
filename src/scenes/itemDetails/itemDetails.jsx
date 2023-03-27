import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Item from "../../components/Item";
import { useParams } from "react-router-dom";
import { addToCart } from "../../state";
import { useNavigate } from "react-router-dom";

// Elements style
import {
  IconButton,
  Box,
  Typography,
  Button,
  Tab,
  Tabs,
  Breadcrumbs,
  Link,
  Rating
} from "@mui/material";


// icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

// Style
import { shades } from "../../theme";

// Bootstrap
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";




const ItemDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //We're going to grab the item id in the url
  const { itemId, restaurantId } = useParams();

 

  //HOW MANY WE WANT TO ADD TO THE CART
  const [count, setCount] = useState(1);

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
      `http://localhost:1337/api/items/${itemId}?populate=*`,
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
const idRestaurant = item?.attributes?.restaurant?.data?.id;

const filterbyIdRestaurant = items.filter(
  (item) => item.attributes.restaurant.data.id === idRestaurant
);

//PARA LOS BULLETS
  const offert = item?.attributes?.descuento > 0;
  const descuento = item?.attributes?.descuento;
  const price = item?.attributes?.price;
  const precio_final = price - price * descuento;


  const Discount = () => {
    return (
      <>
        <Col className="px-0">
          <Typography fontWeight="bold" sx={{ textDecoration: "line-through" }}>
            <small>{"$" + item?.attributes?.price}</small>
          </Typography>
        </Col>
      </>
    );
  };

  // --BULLETS FIN--

  return (
    <>

      <Box width="80%" m="80px auto">
        <Box display="flex" flexWrap="wrap" columnGap="40px">
          {/* IMAGES */}
          <Box flex="1 1 40%" mb="40px">
            <img
              alt={item?.name}
              width="100%"
              height="100%"
              src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url}`}
              style={{ objectFit: "contain"}}
            />
          </Box>

          {/* ACTIONS */}
          <Box flex="1 1 50%" mb="40px">
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
                <Link
                  underline="hover"
                  color="neutral"
                  fontSize="inherit"
                  fontWeight="bold"
                  
                  style={{
                    cursor: "pointer",    
                    color:shades.primary[400]           
                  }} 
                  onClick={() => navigate(`../../restaurant/${item?.attributes?.restaurant?.data?.id}`)}>
                  {item?.attributes?.restaurant?.data?.attributes?.nameRestaurant}
                </Link>


                <Typography fontSize="inherit">{item?.attributes?.name}</Typography>
              </Breadcrumbs>

            </Box>

            <Box m="65px 0 25px 0">
              <Typography variant="h2">{item?.attributes?.name}</Typography>
              <Row className="d-flex justify-content-start">
                <Col className=" col-sm-2 col-4 me-md-1 me-0 d-flex justify-content-center">
                  <img
                  alt={item?.name}
                  style={{
                    cursor: "pointer",
                    borderRadius: 100,
                    objectFit: "contein",
                    maxWidth:"40px",
                    maxHeight:"40px",
                    margin:"10px 0 0"                 
                  }}
                  onClick={() => navigate(`../../restaurant/${item?.attributes?.restaurant?.data?.id}`)}
                  src={`http://localhost:1337${item?.attributes?.logo?.data?.attributes?.formats?.thumbnail?.url}`}
                  
                />

                </Col>
                <Col className="px-0">
                  <Typography 
                    m="20px 0 15px 0px" 
                    variant="h3"
                    style={{
                      cursor: "pointer",                
                    }}                   
                    onClick={() => navigate(`../../restaurant/${item?.attributes?.restaurant?.data?.id}`)}>
                      {item?.attributes?.restaurant?.data?.attributes?.nameRestaurant}
                  </Typography>
                </Col>
              </Row>
              <Row className="d-flex justify-content-start">
                <Col className=" col-sm-2 col-4 me-md-1 me-0">
                  <Typography variant="h3" fontWeight="bold">
                    {"$" + parseFloat(precio_final).toFixed(2)}
                  </Typography>
                </Col>
                {offert && <Discount />}
              </Row>

            </Box>

            <Box display="flex" alignItems="center" minHeight="50px">

              <Box
                display="flex"
                alignItems="center"
                border={`1.5px solid ${shades.neutral[300]}`}
                mr="20px"
                p="2px 5px"
              >
                <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                {/* <IconButton onClick={() => setCount(Math.min(count + 1, stockInventary ))}>
                  <AddIcon />
                </IconButton> */}
                <IconButton onClick={() => setCount(Math.min(count + 1 ))}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Button
                className="button button-7"
                onClick={() => { 

                  dispatch(addToCart({ item: { ...item, count } }))

                }}
              >
                <Box
                  className="dub-arrow"
                  backgroundColor={shades.neutral[300]}
                  color={shades.primary[500]}
                >
                  <ShoppingCartCheckoutIcon />
                </Box>
                <Box
                  className="addedCart"
                  backgroundColor={shades.tonos[800]}
                  color={shades.neutral[100]}
                >
                  <CheckIcon />
                  Agregado
                </Box>
                <Box
                  backgroundColor={shades.primary[500]}
                  color={shades.neutral[100]}
                  className="preliminar"
                >
                  Añadir al carrito
                </Box>
              </Button>
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
              <Typography>Tags: {item?.attributes?.tags?.data?.attributes?.tag}</Typography>
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
            <div>{item?.attributes?.longDescription}</div>
          )}
          {value === "reviews" && <div>reviews</div>}
        </Box>

        {/* RELATED ITEMS */}
        <Box mt="50px" width="100%">
          <Typography variant="h3" fontWeight="bold">
            Otros platillos de {item?.attributes?.restaurant?.data?.attributes?.nameRestaurant}
          </Typography>
          <Box className="wrapper py-3 px2">
            {filterbyIdRestaurant.slice(0, 5).map((item, i) => (
                <Item key={`${item.name}-${i}`} item={item} />
              ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ItemDetails;
