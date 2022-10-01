import { useContext } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import axios from 'axios';
function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
    userInfo,
  } = state;
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, The product is out of the stock');
      return;
    }
    ctxDispatch({
      type: 'ADD_CART_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'REMOVE_ITEM', payload: { ...item } });
  };
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty <Link to="/">Go to shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link className="f-size" to={`/product/${item.slug}`}>
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                      >
                        <i className="fas fa-minus-circle" />
                      </Button>
                      {item.quantity}
                      <Button
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <i className="fas fa-plus-circle" />
                      </Button>
                    </Col>
                    <Col md={3}>{item.price}$</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, b) => a + b.quantity, 0)}{' '}
                    Items): $
                    {cartItems.reduce((a, b) => a + b.price * b.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                      onClick={() =>
                        userInfo
                          ? navigate('/shipping')
                          : navigate('/signIn?redirect=/shipping')
                      }
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
