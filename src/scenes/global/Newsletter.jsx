// FORMATO- APARIENCIA
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {  Box, Typography, Icon } from "@mui/material";
import MarkReadOutlineIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { shades } from "../../theme";
import { minWidth } from "@mui/system";
// ----FORMATO- END

const Newsletter = () => {
  const [validated, setValidated] = useState(false);
  

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <Box backgroundColor={shades.neutral[600]}>
        <Container className="justify-content-center d-flex">
          <Row className="p-sm-5 px-3 py-4">
            <Box className="text-center" color={shades.primary[400]}>
              <MarkReadOutlineIcon fontSize="large"  cursor="default"/>
            </Box>
            <Typography
              color={shades.primary[400]}
              cursor="none"
              variant="h3"
              className="text-center mb-1"
            >
              Subscríbete a nuestro newsletter
            </Typography>
            <Typography className="text-center mb-4" color={shades.neutral[800]}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
              unde eveniet esse asperiores!
            </Typography>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <InputGroup className="justify-content-center">
                <Form.Group controlId="validationCustomUsername" className="w-75">
                  <InputGroup hasValidation>
                    <Button id="inputNewsMail" type="submit" className="text-uppercase">
                      Suscríbete
                    </Button>
                    <Form.Control
                      type="email"
                      placeholder="Inserte un correo electrónico"
                      aria-describedby="inputNewsMail"
                      required
                    />
                    <Form.Control.Feedback type="invalid" className="text-center">
                      Correo electrónico inválido.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </InputGroup>
            </Form>
          </Row>
        </Container>
      </Box>
    </>
  );
};

export default Newsletter;
