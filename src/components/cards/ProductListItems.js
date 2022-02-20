import React from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const { price, category, shipping, color, brand, quantity, sold } = product;
  return (
    <ul className='list-group'>
      <li className='list-group-item'>
        Price
        <span className='label label-default label-pill pull-xs-right'>
          ${price}
        </span>
      </li>

      {category && (
        <li className='list-group-item'>
          Catgeory
          <Link
            to={`/category/${category.slug}`}
            className='label label-default label-pill pull-xs-right'>
            {category.name}
          </Link>
        </li>
      )}

      <li className='list-group-item'>
        Shipping{" "}
        <span className='label label-default label-pill pull-xs-right'>
          {shipping}
        </span>
      </li>

      <li className='list-group-item'>
        Color{" "}
        <span className='label label-default label-pill pull-xs-right'>
          {color}
        </span>
      </li>

      <li className='list-group-item'>
        Brand{" "}
        <span className='label label-default label-pill pull-xs-right'>
          {brand}
        </span>
      </li>

      <li className='list-group-item'>
        In Stock{" "}
        <span className='label label-default label-pill pull-xs-right'>
          {quantity}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
