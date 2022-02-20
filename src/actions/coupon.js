import axios from 'axios';

export const getCoupons = async() => {
    return await axios.get(`${process.env.REACT_APP_API}/coupons`);
}

export const removeCoupon = async(authtoken, couponId) => {
    return await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
        headers: {
            authtoken
        }
    });
}

export const createCoupon = async(authtoken, coupon) => {
    return await axios.post(`${process.env.REACT_APP_API}/coupon`, {coupon}, {
        headers: {
            authtoken
        }
    });
}