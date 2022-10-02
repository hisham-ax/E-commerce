import React, { useState, useContext, useEffect } from 'react';
import { Store } from '../Store';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/checkoutSteps';

function ShippingAdressScreen() {
  const { state, dispatch: cxtDispatch } = useContext(Store);
  const {
    cart: { shippingAdress },
    userInfo,
  } = state;
  const [fullname, setFullName] = useState(shippingAdress.fullname || '');
  const [adress, setAdress] = useState(shippingAdress.adress || '');
  const [city, setCity] = useState(shippingAdress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAdress.postalCode || '');
  const [country, setCountry] = useState(shippingAdress.country || '');
  const navigate = useNavigate();

  const SubmitHandler = (e) => {
    e.preventDefault();
    cxtDispatch({
      type: 'SAVE_SHIPPING_ADRESS',
      payload: {
        fullname,
        adress,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      'shippingAdress',
      JSON.stringify({
        fullname,
        adress,
        city,
        postalCode,
        country,
      })
    );
    navigate('/payment');
  };
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);
  return (
    <div>
      <Helmet>
        <title>Shipping Adress</title>
      </Helmet>
      <CheckoutSteps />
      <div className="container small-container">
        <h1 className="my-3">Shipping Adress</h1>
        <Form onSubmit={SubmitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullname}
              required
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Adress</Form.Label>
            <Form.Control
              value={adress}
              required
              onChange={(e) => {
                setAdress(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              required
              onChange={(e) => {
                setCity(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              required
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              required
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ShippingAdressScreen;
