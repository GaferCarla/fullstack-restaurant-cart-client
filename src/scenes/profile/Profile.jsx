import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Elements style
import { Box, Typography } from "@mui/material";

// Style
import { shades } from "../../theme";

// Bootstrap
import { Container, Table} from "react-bootstrap";
 //Auth0
import { useAuth0 } from "@auth0/auth0-react";
import AlertAuth from "../../helpers/alertAuth";



const Profile = () => {
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    //Auth
    const { user, isAuthenticated } = useAuth0();


    //GET THE INFORMATION IN STRAPI
  
    const apiUrl = "http://localhost:1337/api/orders?populate=*";
  
  
    useEffect(() => {
      axios.get(apiUrl).then((res) => {
        dispatch(setOrders(res.data));
      });
    }, []);


    const filterbyusername = orders?.data.filter(async(order)=>await order.attributes.username === user.name).map((order) => (
      <tr
      key={order.id}
      // style={{ cursor: "pointer" }}
      // onClick={() =>
      //     navigate(`../../order/${order.id}`)
      // }
      >
          <td style={{ verticalAlign: "middle" }}>
              <p className="mb-0">
              {order.id}
              </p>
          </td>
          <td style={{ verticalAlign: "middle" }}>
              <p className="mb-0">
              {order.attributes.destinatario}
              </p>
          </td>
          <td style={{ verticalAlign: "middle" }}>
              <p className="mb-0">
              {order.attributes.addressShipping}
              </p>
          </td>
      </tr>
  ))

    
  
  return (
  <>
  {
    !isAuthenticated && <AlertAuth/>
  }
  {  isAuthenticated && (
    <>
    <Box width="80%" m="80px auto">
      <Typography variant="h2" className="mb-2">Hola {user.name}</Typography>
      <Typography variant="subtitle">{user.email}</Typography>
      <Typography variant="h4" margin="40px auto 20px">
        Tus pedidos
      </Typography>

      {/* INFORMATION */}

      <Box m="20px 0">
        <Table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Destinatario</td>
              <td>Dirección</td>
            </tr>
          </thead>
          <tbody>
         {filterbyusername}
          </tbody>
        </Table>
      </Box>
    </Box>
  </>
  )}
  </>


  );
};

export default Profile;
