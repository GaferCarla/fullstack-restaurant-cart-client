import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Box, Typography, Tab, Tabs, useMediaQuery} from "@mui/material";
import Item from "../../components/Item";
import { setItems } from '../../state';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery("(min-width:600px)");


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //GET THE INFORMATION IN STRAPI
  
  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=*",
      { method: "GET" }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, []); 
//    eslint-disable-line react-hooks/exhaustive-deps

  const newItems = items.filter(
    (item) => item.attributes.category === "Nuevos"
  );
  const favoriteItems = items.filter(
    (item) => item.attributes.category === "Favoritos"
  );
  const ofertasItems = items.filter(
    (item) => item.attributes.category === "Ofertas"
  );
  const paquetesItems = items.filter(
    (item) => item.attributes.category === "Paquetes"
  );

  return (
    <Box width="85%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Menú del día
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
        <Tab label="Novedades" value="Nuevos" />
        <Tab label="Promociones" value="Ofertas" />
        <Tab label="Favoritos" value="Favoritos" />
        <Tab label="Paquetes" value="Paquetes" />
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
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Favoritos" &&
          favoriteItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Ofertas" &&
          ofertasItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Nuevos" &&
          newItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Paquetes" &&
          paquetesItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}


      </Box>
    </Box>
  );
};

export default ShoppingList;