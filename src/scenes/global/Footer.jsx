import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { shades } from "../../theme";

import GavelIcon from "@mui/icons-material/Gavel";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const Footer = () => {
  return (
    <>
      <Box backgroundColor={shades.neutral[600]}>
        <Container className="py-3 mb-3 d-flex flex-wrap justify-content-center ">
          <Row>
            <Col className="col-md-3 col-12 py-3 px-md-3 px-5">
              <Typography variant="h3" color={shades.neutral[900]}>
                Branding
              </Typography>
              <Typography
                color={shades.neutral[800]}
                className="text-opacity-25 pb-3 pt-2"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam ipsam rem dolore, quaerat nisi quia hic aliquid velit
                suscipit molestias sapiente, impedit voluptatem labore, est
                beatae aliquam. Voluptates, esse at?
              </Typography>
            </Col>
            <Col className="col-md-3 col-sm-6 col-12 py-3">
            <Typography className="d-flex justify-content-center justify-content-md-start" variant="h3" color={shades.neutral[900]}>
                Acerca de...
              </Typography>
              <nav className="d-flex justify-content-center justify-content-md-start">
                <List >
                  <ListItem disablePadding >
                    <ListItemButton className="align-items-center">
                      <ListItemIcon >
                        <MailIcon />
                      </ListItemIcon>
                      <ListItemText primary="Inbox" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <GavelIcon />
                      </ListItemIcon>
                      <ListItemText primary="Términos y condiciones" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <AdminPanelSettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Privacy Policy" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            </Col>
            <Col className="col-md-3 col-sm-6 col-12 py-3">
            <Typography className="d-flex justify-content-center justify-content-md-start" variant="h3" color={shades.neutral[900]}>
                Servicio al cliente
              </Typography>
              <nav className="d-flex justify-content-center justify-content-md-start">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary="Cotiza por mayoreo" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary="Rastrea tu pedido" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            </Col>
            <Col className="col-md-3  col-12 py-3">
              <Typography className="d-flex justify-content-center justify-content-md-start" variant="h3"> Contáctanos</Typography>
              <nav className="d-flex justify-content-center justify-content-md-start">
                <List color={shades.neutral[800]} className="opacity-75">
                  <ListItem>
                    <LocationOnIcon className="me-3" fontSize="small" />
                    <Typography>Street #####</Typography>

                  </ListItem>
                  <ListItem>
                    <MailIcon className="me-3" fontSize="small" />
                    <Typography>mail@holamundo.com</Typography>
                  </ListItem>
                  <ListItem>
                    <LocalPhoneIcon className="me-3" fontSize="small" />
                    <Typography>(222)222-2222</Typography>
                  </ListItem>
                </List>
              </nav>
            </Col>
          </Row>
        </Container>
        <Container className="d-flex flex-wrap justify-content-between align-items-center pt-5 pb-3 border-top bd-footer">
          <Row className="w-100">
            <Col className="Col-md-4 d-flex align-items-center">
              <span className="mb-3 mb-md-0 text-muted" color="shades.primary">
                © 2022 Company, Inc
              </span>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
