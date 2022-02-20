import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../actions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { fetchProductsByFilter } from "../actions/product";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { getCategories } from "../actions/category";
import Star from "../components/forms/Star";

const { SubMenu, ItemGroup } = Menu;

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "ASUS",
    "Toshiba",
    "Lenovo",
  ]);
  const [colors, setColors] = useState([
    "Black",
    "Grey",
    "Silver",
    "White",
    "Blue",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const text = search;

  useEffect(() => {
    loadAllProducts();
    // Fetch all categories
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Products loaded by default
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // Fetch specific products from query
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // Load products based on product range
  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);

  // Handle slider
  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice(value);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // Load products by category
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className='pb-2 pl-4 pr-4 mt-2'
          value={c._id}
          name='category'
          checked={categoryIds.includes(c._id)}>
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);

    // IndexOf = If not found returns -1 else will return index
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
      inTheState.splice();
    }

    setCategoryIds(inTheState);
    console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  // Load products for star value
  const handleStarClick = (num) => {
    console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className='pr-4 pl-4 pb-2'>
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // Show products based on brand
  const showBrands = () =>
    brands.map((b) => (
      <div>
        <Radio
          key={b}
          value={b}
          name={brand}
          checked={b === brand}
          onChange={handleBrand}
          className='pb-1 pl-4 pr-4'>
          {b}
        </Radio>
      </div>
    ));

  const handleBrand = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand(e.target.value);
    setColor("");
    setShipping("");
    fetchProducts({ brand: e.target.value });
  };

  // Search products by color

  const showColors = () =>
    colors.map((c) => (
      <Radio
        key={c}
        value={c}
        name={color}
        checked={c === color}
        onChange={handleColor}
        className='pb-1 pl-4 pr-4'>
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setShipping("");
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  // Search product by shipping
  const showShipping = () => (
    <>
      <Checkbox
        onChange={handleShippingChange}
        checked={shipping === "Yes"}
        className='pb-2 pl-4 pr-4'
        value='Yes'>
        Yes
      </Checkbox>
      <Checkbox
        onChange={handleShippingChange}
        checked={shipping === "No"}
        className='pb-2 pl-4 pr-4'
        value='No'>
        No
      </Checkbox>
    </>
  );

  const handleShippingChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 p-2'>
          <h4>Search/Filter</h4>
          <Menu mode='inline' defaultOpenKeys={["1", "2", "3", "4", "5"]}>
            {/* Price */}
            <SubMenu
              key='1'
              title={
                <span className='h6'>
                  <DollarOutlined />
                  Price
                </span>
              }>
              <div className=''>
                <Slider
                  className='ml-4 mr-4'
                  tipFormatter={(v) => `$${v}`}
                  range
                  max='4999'
                  value={price}
                  onChange={handleSlider}
                />
              </div>
            </SubMenu>
            {/* Category */}
            <SubMenu
              key='2'
              title={
                <span className='h6'>
                  <DownSquareOutlined />
                  Categories
                </span>
              }>
              <div style={{ marginTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>

            {/* Stars */}

            <SubMenu
              key='3'
              title={
                <span className='h6'>
                  <StarOutlined />
                  Rating
                </span>
              }>
              <div style={{ marginTop: "-10px" }}>{showStars()}</div>
            </SubMenu>

            {/* Brands */}
            <SubMenu
              key='4'
              title={
                <span className='h6'>
                  <StarOutlined />
                  Brands
                </span>
              }>
              <div style={{ marginTop: "-10px" }}>{showBrands()}</div>
            </SubMenu>

            {/* Colors */}
            <SubMenu
              key='5'
              title={
                <span className='h6'>
                  <StarOutlined />
                  Colors
                </span>
              }>
              <div style={{ marginTop: "-10px" }}>{showColors()}</div>
            </SubMenu>

            {/* Shipping */}
            <SubMenu
              key='6'
              title={
                <span className='h6'>
                  <StarOutlined />
                  Shipping
                </span>
              }>
              <div style={{ marginTop: "-10px" }}>{showShipping()}</div>
            </SubMenu>
          </Menu>
        </div>
        <div className='col-md-9 p-2'>
          {loading ? (
            <h4 className='text-danger'>Products</h4>
          ) : (
            <h4 className=''>Products</h4>
          )}

          {products.length < 1 && <p>No Products Found</p>}

          <div className='row pb-5'>
            {products.map((p) => (
              <div className='col-md-4 mt-3' key={p._id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
