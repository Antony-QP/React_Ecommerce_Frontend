import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals"
import BestSellers from "../components/home/BestSellers"
import CategoryList from '../components/category/CategoryList'

export const Home = () => {

  return (
    <>
      <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        <Jumbotron text={["New Arrivals", "Best Sellers", "Latest Products"]} />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 jumbotron">New Arrivals</h4>
      <NewArrivals/>

      <h4 className="text-center p-3 mt-5 mb-5 jumbotron">Best Sellers</h4>
      <BestSellers/>

      <h4 className="text-center p-3 mt-5 mb-5 jumbotron">Categories</h4>
      <CategoryList/>
    </>
  );
};
export default Home;
