import React, { useState} from "react";
import { useDispatch} from "react-redux";
import {
  IconButton,
  Box,
  Typography,
  useTheme,
  Button,
  Chip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  const { category, price, name, image, descuento} = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          thumbnail: { url },
        },
      },
    },
  } = image;


  const stock = parseFloat(item?.attributes?.instock);

  // BULLETS INICIO
  const offert = descuento > 0;

  const Discount = () => {
    return (
      <>
        <Col className="col-3 px-0">
          <Chip
            label={"-" + descuento * 100 + "%"}
            fontWeight="bold"
            size="small"
            color="secondary"
          ></Chip>
        </Col>
        <Col>
          <Typography fontWeight="bold" sx={{ textDecoration: "line-through" }}>
            <small>{"$" + price}</small>
          </Typography>
        </Col>
      </>
    );
  };

  const New = () => {
    return (
      <>
        <Col className="col-3 px-0">
          <Chip
            label={"NEW"}
            fontWeight="bold"
            size="small"
            color="success"
          ></Chip>
        </Col>
      </>
    );
  };
  // --BULLETS FIN--

  return (
    <>
      <Box
        className="item"
        width={width}
        paddingY="10px"
        justifyContent="center"
      >
        <Box
          position="relative"
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
          width="220px"
        >
          <img
            alt={item.name}
            width="220px"
            height="220px"
            src={`http://localhost:1337${url}`}
            onClick={() => navigate(`/item/${item.id}`)}
            style={{
              cursor: "pointer",
              border: `1.5px solid ${shades.neutral[500]}`,
              borderRadius: 20,
              objectFit: "cover",
            }}
          />
          <Box
            display={isHovered ? "block" : "none"}
            position="absolute"
            bottom="10%"
            left="0"
            width="100%"
            padding="0 5%"
          >
            <Box display="flex" justifyContent="space-between">
              <Box
                display="flex"
                alignItems="center"
                backgroundColor={shades.neutral[100]}
                borderRadius="3px"
              >
                <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                  <RemoveIcon />
                </IconButton>
                <Typography color={shades.primary[300]}>{count}</Typography>
                <IconButton onClick={() => setCount(Math.min(count + 1, stock ))}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Box>
                <Button
                  className="button button-7"
                  onClick={() => {
                    dispatch(addToCart({ item: { ...item, count } }));
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
                    className="preliminar"
                    backgroundColor={shades.primary[500]}
                    color={shades.neutral[100]}
                  >
                    Añadir
                  </Box>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box mt="15px" px="7px">
          <Typography variant="subtitle2" color={neutral.dark}>
            {item?.attributes?.restaurant?.data?.attributes?.nameRestaurant
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </Typography>
          <Typography variant="h3">{name}</Typography>
          <Container className="px-3 mt-2">
            <Row className="d-flex justify-content-start">
              <Col className="col-5 me-3 ps-0">
                <Typography variant="h3" fontWeight="bold">
                  {"$" + parseFloat(price * (1 - descuento)).toFixed(2)}
                </Typography>
              </Col>
              {offert && <Discount />}
              {category === "Nuevos" && <New />}
            </Row>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Item;
