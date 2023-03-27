import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import	{resetCart} from "../../state/index";
import { useSelector, useDispatch } from "react-redux";




const Confirmation = () => {
  const dispatch = useDispatch();

  window.addEventListener('load', dispatch(resetCart({})));

  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order —{" "}
        <strong>Congrats on Making your Purchase</strong>
      </Alert>
    </Box>
  );
};

export default Confirmation;
