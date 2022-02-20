import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
} from "../actions/user";
import { toast } from "react-toastify";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

export const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      // console.log("User cart response", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const saveAddressToDb = () => {
    saveUserAddress(user.token, address)
      .then((res) => {
        if (res.data.ok) {
          setAddressSaved(true);
          toast.success("Address saved");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setCoupon("")
      toast.success("Cart is empty, continue shopping.");
    });
  };

  const showAddress = (e) => (
    <>
      <input
        onChange={(e) => {setAddress(e.target.value)}}
        type='text'
        className='form-control'
        value={address}
      />
      <button className='btn btn-primary mt-2' onClick={saveAddressToDb}>
        Save
      </button>
    </>
  );

  const showProductSummary = () => {
    return products.map((p, i) => (
      <div className='' key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("Response: ", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        dispatch({
          type: "COUPON_APPLIED",
          payload: true
        })
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        dispatch({
          type: "COUPON_APPLIED",
          payload: false
        })
      }
    });
  };

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {setCoupon(e.target.value); setDiscountError("")}}
        type='text'
        className='form-control'
        value={coupon}
      />
      <button onClick={applyDiscountCoupon} className='btn btn-primary mt-2'>
        Apply
      </button>
    </>
  );

  return (
    <div className='row'>
      <div className='col-md-6'>
        <h4>Delivery Address</h4>
        <br />
        <br />
        {showAddress()}
        <hr />
        <h4>Got Coupon?</h4>
        {showApplyCoupon()}
        <br />
        {discountError && <p className='text-danger'>{discountError}</p>}
        <br />
      </div>
      <div className='col-md-6'>
        <h4>Order Summary</h4>
        <h2>{total}</h2>
        <hr />
        <p>
          <b>{products.length}</b> products in cart
        </p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: ${total}</p>
        {totalAfterDiscount > 0 && <p>Discount applied. Total payable: ${totalAfterDiscount}</p> }
        <div className='row'>
          <div className='col-md-6'>
            <button
              onClick={() => history.push('/payment')}
              className='btn btn-primary'
              disabled={!addressSaved || !products.length}>
              Place Order
            </button>
          </div>
          <div className='col-md-6'>
            <button
              onClick={emptyCart}
              disabled={!products.length}
              className='btn btn-primary'>
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
