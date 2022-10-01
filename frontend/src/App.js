import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Store } from './Store';
import { LinkContainer } from 'react-router-bootstrap';
//  React Bootstrap Compoents
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAdressScreen from './screens/ShippingAdressScreen';

function App() {
  const { state, dispatch: cxtDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    cxtDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAdress');
  };
  return (
    <BrowserRouter>
      <div className="App d-flex flex-column site-container">
        <ToastContainer position="top-center" limit={1} />
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Dream Mool</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to={'/cart'} className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, b) => a + b.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to={'/signin'}>
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/shipping" element={<ShippingAdressScreen />} />
            </Routes>
          </Container>
        </main>
        <footer className="text-center">
          <div>All Rights Reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
