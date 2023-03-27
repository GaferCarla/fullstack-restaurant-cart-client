import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import {Box, Typography, Tab, Tabs, useMediaQuery} from "@mui/material";
import Restaurant from "../../components/Restaurant";
import axios from "axios"
import { useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";

//Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container, Row, Col } from "react-bootstrap";


const RestaurantList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const isNonMobile = useMediaQuery("(min-width:600px)");



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //GET THE INFORMATION IN STRAPI
  const [restaurants, setRestaurants] = useState();


  useEffect(() => {
    axios.get("http://localhost:1337/api/restaurants?populate=*").then((res) => {
      
      dispatch(setRestaurants(res.data));
    });
  }, [dispatch]);



  const italiana = restaurants?.data?.filter(
    (restaurant) => restaurant?.attributes?.category === "Italiana"
  );
  const americana = restaurants?.data?.filter(
    (restaurant) => restaurant?.attributes?.category === "Americana"
  );
  const fastFood = restaurants?.data?.filter(
    (restaurant) => restaurant?.attributes?.category === "F&F"
  );


  return (
    <Box width="85%" margin="60px auto 80px">
      <Container className='container-fluid mb-4'>
        <Row className='d-flex justify-content-center justify-content-sm-end'>
          <Col className='col-md-4 col-8'>
            <InputGroup className="mb-3" onClick={() => navigate(`/search`)}>
              <Button variant="outline-secondary" id="button-addon1">
                <SearchIcon fontSize="large" />
              </Button>
              <Form.Control
                aria-describedby="basic-addon1"
                placeholder='Busca tu restaurante'
              />
            </InputGroup>
          </Col>
        </Row>        
      </Container>

      <Typography variant="h3" textAlign="center">
        Pide lo que quieres
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="Todos" value="all" />
        <Tab label="Americana" value="Americana" />
        <Tab label="Italiana" value="Italiana" />
        <Tab label="Fast&Food" value="F&F" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 200px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
      
        {value === "all" &&
        restaurants?.data.map((restaurant) => (
            <Restaurant restaurant={restaurant} key={`${restaurant.nameRestaurant}-${restaurant.id}`} />
          ))}

        {value === "Italiana" &&
        italiana?.map((restaurant) => (
            <Restaurant restaurant={restaurant} key={`${restaurant.nameRestaurant}-${restaurant.id}`} />
          ))}
                      
        {value === "Americana" &&
        americana.map((restaurant) => (
            <Restaurant restaurant={restaurant} key={`${restaurant.nameRestaurant}-${restaurant.id}`} />
          ))}
        
        {value === "F&F" &&
        fastFood.map((restaurant) => (
            <Restaurant restaurant={restaurant} key={`${restaurant.nameRestaurant}-${restaurant.id}`} />
          ))} 


      </Box>
    </Box>
  );
};

export default RestaurantList;