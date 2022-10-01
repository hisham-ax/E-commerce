import Container from 'react-bootstrap/esm/Container';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
export default function SigninScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch: cxtDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectUrl ? redirectUrl : '/';
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/signin', {
        email,
        password,
      });
      cxtDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <div>
          <Button type="submit">Sign In</Button>
        </div>
        <div>
          New Account?
          <Link to={`/signup/redirect=${redirect}`}>Create New Account</Link>
        </div>
      </Form>
    </Container>
  );
}
