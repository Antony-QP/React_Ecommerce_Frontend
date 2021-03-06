import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount, removeProduct } from "../../../actions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';

export const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      }) 
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleRemove = (slug) => {
     if(window.confirm("Are you sure?")){
       removeProduct(slug, user.token)
       .then(res => {
         loadAllProducts()
         toast.error(`Product deleted`)
       })
       .catch(err => {
        if (err.response.status === 400) toast.error(err.response.data);
         console.log(err)
       })
     }
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? <h4>Loading...</h4> : <h4>All products</h4>}
          <div className='row'>
            {products.map((product) => (
              <div className='col-md-4 pb-3' key={product._id}>
                <AdminProductCard product={product} handleRemove={handleRemove}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
