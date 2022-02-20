import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../actions/stripe";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import Laptop from "../images/default.png";
import { createOrder, emptyUserCart } from '../actions/user'

const StripeCheckout = () => {
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      console.log("Create payment intent", res.data.clientSecret);
      setClientSecret(`${res.data.clientSecret}`);
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(`${clientSecret}`, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      createOrder(payload, user.token)
      .then(res => {
        if(res.data.ok){
          // Empty cart from LS
          if(typeof window !== 'undefined'){
            localStorage.removeItem("cart")
          }
          // Empty cart from Redux
          dispatch({
            type: "ADD_TO_CART",
            payload: []
          })
          // Reset coupon to false
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          })
          // Empty cart from DB
          emptyUserCart(user.token)
        }
      })
      console.log(JSON.stringify(payload, null, 4));
      setError("");
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <div>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className='alert alert-success'>{`Total after discount: $${totalAfterDiscount}`}</p>
          ) : (
            <p className='alert alert-danger'> No coupon applied </p>
          )}
        </div>
      )}

      <div className='text-center pb-5'>
        <Card
          cover={
            <img
              src={Laptop}
              style={{
                height: "200px",
                objectFit: "cover",
                marginBottom: "-50px",
              }}
            />
          }
          actions={[
            <>
              <DollarOutlined className='text-info' />
              <br /> Total: ${cartTotal}
            </>,
            <>
              <CheckOutlined className='text-info' />
              <br /> Total Payable: ${(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>

      <form id='payment-form' className='stripeForm' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          className='stripe-button'
          disabled={processing || disabled || succeeded}>
          <span id='button-text'>
            {processing ? <div className='spinner' id='spinner'></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className='card-error' role='alert'>
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful{" "}
          <Link to='/user/history'>See it in your purchase history</Link>
        </p>
      </form>
    </div>
  );
};

export default StripeCheckout;
