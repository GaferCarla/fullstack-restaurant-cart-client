import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import Payment from "./Payment";
import Shipping from "./Shipping";
import AlertAuth from "../../helpers/alertAuth";
import { loadStripe } from "@stripe/stripe-js";
//Auth0
import { useAuth0 } from "@auth0/auth0-react";

const stripePromise = loadStripe(
  "pk_test_51MUQVjLH90D8foouvhxU844zsAAhEXMDxln17W4I8yfLuTvzINLEsBiH9WnnDwairoKXdId2fvUtXTo8pTG2FoYQ00utPWpKcA"
);

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

const Checkout = () => {
  const { user, isAuthenticated } = useAuth0();

  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    // this copies the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  async function makePayment(values) {
    const stripe = await stripePromise;
    const destinatario =
      values.shippingAddress.firstName + "" + values.shippingAddress.lastName;
    const remitente =
      values.billingAddress.firstName + "" + values.billingAddress.lastName;
    const addressShipping =
      values.shippingAddress.street1 +
      ". " +
      values.shippingAddress.zipCode +
      ". " +
      values.shippingAddress.city +
      ". " +
      values.shippingAddress.state +
      ". " +
      values.shippingAddress.country;
    const username = user.name;
    const requestBody = {
      username: username,
      remitente: remitente,
      email: values.email,
      phone: values.phoneNumber,
      destinatario: destinatario,
      addressShipping: addressShipping,
      products: cart.map(({ id, count, attributes }) => ({
        id,
        count,
        name: attributes.name,
        price: attributes.price,
        descuento: attributes.descuento,
        precioFinal: attributes.price - attributes.price * attributes.descuento,
      })),
    };

    const response = await fetch("http://localhost:1337/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  return (
    <>
      {!isAuthenticated && <AlertAuth />}
      {isAuthenticated && (
        <Box width="80%" m="100px auto">
          <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
            <Step>
              <StepLabel>Dirección</StepLabel>
            </Step>
            <Step>
              <StepLabel>Información de pago</StepLabel>
            </Step>
          </Stepper>
          <Box>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema[activeStep]}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  {isFirstStep && (
                    <Shipping
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  {isSecondStep && (
                    <Payment
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  <Box display="flex" justifyContent="space-between" gap="50px">
                    {!isFirstStep && (
                      <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        sx={{
                          backgroundColor: shades.primary[200],
                          boxShadow: "none",
                          color: "white",
                          borderRadius: 0,
                          padding: "15px 40px",
                        }}
                        onClick={() => setActiveStep(activeStep - 1)}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      fullWidth
                      type="submit"
                      color="primary"
                      variant="contained"
                      sx={{
                        backgroundColor: shades.primary[400],
                        boxShadow: "none",
                        color: "white",
                        borderRadius: 0,
                        padding: "15px 40px",
                      }}
                    >
                      {!isSecondStep ? "Next" : "Place Order"}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Checkout;
