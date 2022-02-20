import React,{ useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Laptop from "../../images/default.png";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modals/RatingModal";
import { showAverage } from "../../actions/rating";
import { useSelector, useDispatch } from 'react-redux'
import _ from "lodash";
import { addToWishlist } from '../../actions/user'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

const { Meta } = Card;
const { TabPane } = Tabs;

// Child component of product.  Importing props from parent
const SingleProduct = ({ product, onStarClick, star }) => {

  const [tooltip, setToolTip ] = useState("Click to add")

  const { user, cart } = useSelector((state) => ({ ...state }))

  const dispatch = useDispatch()

  let history = useHistory()

  const { title, images, description, _id } = product;

  const handleAddToCart = () => {
    // Create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // If cart is in localstorage, retrieve it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // Push new product into cart
      cart.push({
        ...product,
        count: 1,
      });
      // Remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
      // Show tool tip
      setToolTip("Added");

      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      })
       // Show cart items in side drawer
       dispatch({
        type: "SET_VISIBLE",
        payload: true,
      })
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(user.token, product._id).then(res => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("ADDED TO WISHLIST");
      history.push("/user/wishlist");
    })
  }

  return (
    <>
      <div className='col-md-7'>
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop={true}>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={Laptop}
                style={{ height: "450", objectFit: "cover" }}
                className='mb-3'
              />
            }></Card>
        )}
        <Tabs type='card'>
          <TabPane tab='Description' key='1'>
            {description && description}
          </TabPane>
          <TabPane tab='More' key='2'>
            Call to find out more about the product on 12345 678 91011
          </TabPane>
        </Tabs>
      </div>

      <div className='col-md-5'>
        <h1 className='bg-info p-3'>{title}</h1>
        {product && product.ratings && product.ratings.length > 0
          ? showAverage(product)
          : <div className="text-center">No Rating Yet</div>}
        <Card
          actions={[
            <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className='text-danger' />
              <br />
              Add To Cart
            </a>
          </Tooltip>,
            <>
              <a onClick={handleAddToWishlist}>
                <HeartOutlined className='text-info' />
                  <br />
                  Add To Wishlist
              </a>
            </>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                isSelectable={true}
                starRatedColor='red'
                changeRating={onStarClick}
              />
            </RatingModal>,
          ]}>
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
