import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../actions/user";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((a, b) => {
      return a + b.count * b.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4))
    userCart(cart, user.token)
      .then((res) => {
        console.log("Cart post response", res);
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((err) => console.log("cart save error", err));
  };

  const showCartItems = () => (
    <table className='table table-bordered'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>Image</th>
          <th scope='col'>Title</th>
          <th scope='col'>Price</th>
          <th scope='col'>Brand</th>
          <th scope='col'>Colour</th>
          <th scope='col'>Count</th>
          <th scope='col'>Shipping Status</th>
          <th scope='col'>Remove</th>
        </tr>
      </thead>
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className='container-fluid pt-2'>
      <div className='row'>
        <div className='col-md-8'>
          <h4>Cart / {cart.length} Products</h4>
          {!cart.length ? (
            <p>
              No products in cart. <Link to='/shop'>Continue shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className='col-md-4'>
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <button
              onClick={saveOrderToDb}
              className='btn btn-sm btn-primary mt-2'
              disabled={!cart.length}>
              Proceed to checkout
            </button>
          ) : (
            <button className='btn btn-sm btn-primary mt-2'>
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}>
                Login to checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
