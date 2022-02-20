import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../actions/coupon";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");
  const [coupons, setCoupons] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getCoupons().then((res) => setCoupons(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon(user.token, { name, expiry, discount })
      .then((res) => {
        setLoading(false);
        getCoupons().then((res) => setCoupons(res.data));
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => {
        console.log(err, "Coupon error");
      });
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCoupon(user.token, couponId)
        .then((res) => {
          getCoupons().then((res) => setCoupons(res.data));
          setLoading(false);
          toast.error(`Coupon - "${res.data.name}" - deleted`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <h4>Coupon</h4>

          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Coupon</h4>
          )}

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label className='text-muted'>Name</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>

            <div className='form-group'>
              <label className='text-muted'>Discount %</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>

            <div className='form-group'>
              <label className='text-muted'>Expiry</label>
              <br />
              <DatePicker
                className='form-control'
                selected={new Date()}
                value={expiry}
                onChange={(date) => setExpiry(date)}
              />
            </div>

            <button className='btn btn-outline-primary'>Save</button>
          </form>
          <br />
          <h4>{coupons.length}</h4>

          <table className='table table-bordered'>
            <thead className='thead-light'>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Expiry</th>
                <th scope='col'>Discount</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}</td>
                  <td>
                    <DeleteOutlined
                      onClick={() => handleRemove(c._id)}
                      className='text-danger pointer'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
