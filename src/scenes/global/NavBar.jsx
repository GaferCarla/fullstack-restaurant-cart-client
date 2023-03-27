import { useDispatch, useSelector } from "react-redux";

//Bootstrap react
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

//import button profile components
import { useAuth0 } from "@auth0/auth0-react";
// Icon;
import { Badge, IconButton } from "@mui/material";
import {
  ShoppingBagOutlined,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";
import { height, minWidth } from "@mui/system";

const NavBar = () => {
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const badgeStyle = {
    "& .MuiBadge-badge": {
      right: 5,
      top: 5,
      padding: "0 4px",
      height: "14px",
      minWidth: "13px",
    },
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        className="sticky-top"
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand className="text-uppercase" href="/">
            Shopping Cart
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {/* Principal navbar */}
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate(`/`)} className="mx-3">
                Home
              </Nav.Link>
              <Nav.Link disabled href="/" className="mx-3">
                Shopping cart
              </Nav.Link>
              <NavDropdown
                className="mx-3"
                disabled
                title="Dropdown"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* secondary navbar */}
            <Form className="d-flex justify-content-evenly justify-content-lg-end">
              <Nav.Link onClick={() => navigate(`/search`)} className="mx-3">
                <IconButton sx={{ color: "white" }}>
                  <SearchIcon />
                </IconButton>
              </Nav.Link>

              <Nav.Link className="mx-3">
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="button-tooltip-2">Carrito de compra</Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                    <Badge
                      badgeContent={cart.length}
                      color="secondary"
                      invisible={cart.length === 0}
                      sx={badgeStyle}
                    >
                      <IconButton
                        //this gonna update our state once we click on it so it'll run this fuction
                        onClick={() => dispatch(setIsCartOpen({}))}
                        sx={{ color: "white" }}
                      >
                        <ShoppingBagOutlined {...triggerHandler} />
                      </IconButton>
                    </Badge>
                  )}
                </OverlayTrigger>
              </Nav.Link>
              {isAuthenticated && (
                <Nav.Link onClick={() => navigate(`/profile`)} className="mx-3">
                  <IconButton sx={{ color: "white" }}><AccountCircleIcon/></IconButton>
                </Nav.Link>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
