import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Store } from '../Store';
import axios from 'axios';

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addCartHandler = async (item) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    const existProduct = cartItems.find((x) => x._id === product._id);
    const quantity = existProduct ? existProduct.quantity + 1 : 1;
    if (data.countInStock < quantity) {
      window.alert('Sorry, The product is out of the stock');
      return;
    }
    ctxDispatch({
      type: 'ADD_CART_ITEM',
      payload: { ...item, quantity },
    });
  };
  return (
    <Card className="product text-center">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>${product.price}</Card.Text>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        {product.countInStock <= 0 ? (
          <Button variant="light">Out of Stock</Button>
        ) : (
          <Button
            className="btn-primary"
            onClick={() => addCartHandler(product)}
          >
            Add To Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;
