import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginButton from "../scenes/loginLogout/loginbutton"

const AlertAuth = () => {
  return (
    <>
      <Container className="container-fluid">
        <Row className="d-flex justify-content-center py-5">
          <Col className="text-center">
            <img
              style={{
                objectFit: "cover",
                maxHeight:"200px"
              }}
              className="my-3"
              src='images/error.png'
            />
            <h3 className="mb-4">
              Upss!! <br />
              necesitas inicar sesión para acceder
            </h3>
            <LoginButton></LoginButton>


          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AlertAuth;
