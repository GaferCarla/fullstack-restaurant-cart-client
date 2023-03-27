import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import { useEffect } from "react";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
  setItems,
  resetCart
} from "../../state";
import { useNavigate } from "react-router-dom";

//Bootstrap react
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";


const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  
  
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  //remember cart after state. represents the name: "cart" in the objet createSlice. And
  //isCartOpen is the propierty for initialState

  
  const totalPrice = cart.reduce((total, item) => {
    const precio_final = (item.attributes.price *(1 - item.attributes.descuento))
    return total + item.count * precio_final;
  }, 0);

  const totalItem = cart.reduce((total, item) => {
    return total + item.count;
  }, 0);

  

  return (
    //Background overlay (OFFCANVAS)
    <Box
      display={isCartOpen ? "block" : "none"}
      // onClick={() => dispatch(setIsCartOpen({}))}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
    >
      {/* SIDEMENU OFFCANVAS*/}
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"
        zIndex={20}
        overflow="auto"
      >
        <Container fluid className="p-4">
          {/* HEADER & CLOSE BUTTON*/}
          <Row className="mb-4 flex-fill" >
            <Col xs={9}>
              <Typography variant="h3" className="py-3">
                CARRITO DE COMPRA ({cart.length})
              </Typography>
            </Col>
            <Col xs={3} className="d-flex justify-content-end">
              <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                <CloseIcon sx={{ fontSize: "30px" }} />
              </IconButton>
            </Col>
          </Row>

          {/* CART LIST */}
          <Row overflow="auto">
            {/* todolo que esté en el cart el cual esté contenido en el array... vamos contabilizar cada item * n cantidad de veces */}
            {cart.map((item) => (
              // esta box va a requerir una key porque react requiere de un identificador único (id)
              //estas propiedades de item las recuperaremos de strapi
              //strapi crea los objetos por nosotros cuando recuperamos la API
              <Container fluid key={`${item.attributes.name}-${item.id}`}>
                <Row className="mb-4 flex-fill">
                  <Col className="d-flex justify-content-center col-4">
                    <img
                      alt={item?.name}
                      style={{ objectFit: "contain", cursor: "pointer"}}
                      width="100px"
                      height="100px"
                      onClick={() =>  dispatch(setIsCartOpen({})) && navigate(`/item/${item.id}`)}
                      src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url}`}
                    />
                  </Col>
                  <Col className="col-8">
                    {/* ITEM NAME */}
                    <FlexBox>
                      <Typography fontWeight="bold" type="button"  onClick={() =>  dispatch(setIsCartOpen({})) && navigate(`/item/${item.id}`)}>
                        {item.attributes.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>{item.attributes.country}</Typography>

                    {/* AMOUNT */}
                    <FlexBox m="14px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        {/* DECREASE ICON */}
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: item.id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        {/* -- */}

                        <Typography>{item.count}</Typography>

                        {/* INCREASE ICON */}
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: item.id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                        {/* -- */}
                      </Box>

                      {/* PRICE WITH DESCOUNT */}
                      <Row>
                        <Typography
                          className="pe-5"
                          fontWeight="bold"
                          variant="subtitle2"
                          textAlign="right"
                          color={shades.neutral[700]}
                        >
                          {"-"+item.attributes.descuento * 100+"%"}
                        </Typography>
                        <Typography className="pe-5" fontWeight="bold" variant="h4" textAlign="right">
                          {"$"+parseFloat(item.attributes.price * (1 - item.attributes.descuento)).toFixed(2)}
                        </Typography>
                      </Row>

                      {/* -- */}
                    </FlexBox>
                  </Col>
                </Row>
                <Divider />
              </Container>
            ))}
          </Row>

          {/* ACTIONS */}
          <Row className="my-1">
            <FlexBox m="20px 0">
              <Typography fontSize={16} fontWeight="bold">
                SUBTOTAL:
              </Typography>
              <Typography fontSize={14} fontWeight="bold" alignContent="center">
                <small>{totalItem +" productos"}</small>           
              </Typography>
              <Typography fontSize={16} fontWeight="bold" className="me-3">
                {"$"+parseFloat(totalPrice).toFixed(2)}
              </Typography>

            </FlexBox>

            {/* Checkout */}
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "10px 0",
                fontWeight: "bold",
              }}
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }}
            >
              COMPRAR
            </Button>

            {/* Vaciar carrito */}
            <Button
              sx={{
                backgroundColor: shades.secondary[700],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0 10px",
                fontWeight: "bold",
              }}
              onClick={() => {
                dispatch(resetCart({}));
              }}
            >
              Vaciar carrito
            </Button>
          </Row>
        </Container>
      </Box>
    </Box>
  );
};

export default CartMenu;
