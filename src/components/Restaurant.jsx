import React from "react";
import { useDispatch} from "react-redux";
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { Container } from "@mui/system";

import { shades } from "../theme";
import { useNavigate } from "react-router-dom";


const Restaurant = ({ restaurant, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    palette: { neutral },
  } = useTheme();

  const { nameRestaurant, description, logo} = restaurant.attributes;

  const {
    data: {
      attributes: {
        formats: {
          thumbnail: { url },
        },
      },
    },
  } = logo;




  return (
    <>
      <Box
        className="restaurant"
        width={width}
        paddingY="10px"
        justifyContent="center"
      >
        <Box
          position="relative"
          width="220px"
        >
          <img
            alt={restaurant.nameRestaurant}
            width="220px"
            height="220px"
            src={`http://localhost:1337${url}`}
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            style={{
              cursor: "pointer",
              border: `1.5px solid ${shades.neutral[500]}`,
              borderRadius: 20,
              objectFit: "cover",
              
            }}
          />
        </Box>

        <Box mt="3px" px="20px" textAlign={"center"}>
          <Typography my="10px" variant="h3">{nameRestaurant}</Typography>

          <Typography variant="subtitle1" color={neutral.dark}>
            {description
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </Typography>
          <Container>
          </Container>
        </Box> 

      </Box>
    </>
  );
};

export default Restaurant;
