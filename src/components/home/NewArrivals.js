import React, { useEffect, useState } from "react";
import {
  getProducts,
  getProductCount,
  getProduct,
} from "../../actions/product";
import ProductCard from "../cards/ProductCard";
import Jumbotron from "../cards/Jumbotron";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

export const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductCount().then((res) => {
      console.log(res.data);
      setProductCount(res.data);
    });
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // Sort, Order and Limit here
    getProducts("createdAt", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      {productCount}
      <div className='container'>
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className='row'>
            {products.map((product) => (
              <div key={product._id} className='col-md-4'>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='row'>
        <nav className='col-md-4 offset-md-4 text-center pt-5 p3'>
          <Pagination
            current={page}
            total={(productCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default NewArrivals;
