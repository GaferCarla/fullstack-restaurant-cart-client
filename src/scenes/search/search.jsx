import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//Format
import { Container, Table, Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";



const Search = () => {
  //setear los hooks useState
  const [search, setSearch] = useState("");
  const [restaurants, setRestaurants] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  //GET THE INFORMATION IN STRAPI

  const apiUrl = "http://localhost:1337/api/restaurants?populate=*";


  useEffect(() => {
    axios.get(apiUrl).then((res) => {
      dispatch(setRestaurants(res.data));
    });
  }, [dispatch]);

  //Búsqueda
  const searcher = (e) => {
    setSearch(e.currentTarget.value)
    // console.log(e.currentTarget.value)
  }

  //FILTER RELATED ITEMS BY SAME RESTAURANT
  let results = []
    if(search === "")
    {
      results =restaurants?.data.map((restaurant) => (
        <tr
          key={restaurant.id}
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate(`../../restaurant/${restaurant.id}`)
          }
        >
          <td style={{ width: "50px" }}>
            <img
              alt={restaurant?.name}
              style={{
                borderRadius: 100,
                objectFit: "contein",
                maxWidth: "40px",
                maxHeight: "40px",
                margin: "auto",
              }}
              src={`http://localhost:1337${restaurant?.attributes?.logo?.data?.attributes?.formats?.thumbnail?.url}`}
            />
          </td>
          <td style={{ verticalAlign: "middle" }}>
            <h4 className="mb-0">
              {restaurant.attributes.nameRestaurant}
            </h4>
          </td>
        </tr>
      ))
    }
    else{
      results = restaurants?.data.filter( (restaurant) =>
      restaurant?.attributes?.nameRestaurant.toLowerCase().includes(search.toLocaleLowerCase())).map((restaurant) => (
        <tr
          key={restaurant.id}
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate(`../../restaurant/${restaurant.id}`)
          }
        >
          <td style={{ width: "50px" }}>
            <img
              alt={restaurant?.name}
              style={{
                borderRadius: 100,
                objectFit: "contein",
                maxWidth: "40px",
                maxHeight: "40px",
                margin: "auto",
              }}
              src={`http://localhost:1337${restaurant?.attributes?.logo?.data?.attributes?.formats?.thumbnail?.url}`}
            />
          </td>
          <td style={{ verticalAlign: "middle" }}>
            <h4 className="mb-0">
              {restaurant.attributes.nameRestaurant}
            </h4>
          </td>
        </tr>
      ))    
    }

  return (
    <Container className="my-5 p-4">
      <Row className="d-flex justify-content-center">
        <Typography variant="h2" textAlign="center">
            <SearchIcon fontSize="large" />
          Busca tu restaurante favorito
        </Typography>
        <Container className="container-fluid my-3">
          <Row className="d-flex justify-content-center">
            <Col className="my-md-2 my-3 col-12 col-md-5 px-4 px-md-2">
              <form>
              <input onChange={searcher} value={search} type="text" placeholder="Search" className="form-control" />

              </form>
            </Col>
            <Col className="my-md-2 my-2 col-12 col-md-7 px-4" >
              <Table hover variant="dark">
                <tbody>
                  {results}

                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default Search;
