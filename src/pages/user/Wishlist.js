import React, { useState, useEffect} from 'react'
import UserNav from '../../components/nav/UserNav'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getWishlist, removeWishlist } from '../../actions/user'
import { DeleteOutlined } from '@ant-design/icons'


const Wishlist = () => {

    const [wishlist, setWishlist] = useState([])
    const { user } = useSelector((state) => ({...state}));

    useEffect(() => {
        loadWishlist()
    }, [])

    const loadWishlist = () => {
        getWishlist(user.token).then((res) => {
            console.log("loading wishlist", res)
            setWishlist(res.data.wishlist);
        })
    }

    const handleRemove = (productId) => {
        removeWishlist(user.token, productId).then((res) => {
            loadWishlist()
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav/>
                </div>
                <div className="col">
                    <h4>Wishlist</h4>
                    {wishlist.map((p) => (
                        <div className="alert alert-secondary" key={p._id}>
                            <Link to={`/product/${p.slug}`}>{p.title}</Link>
                            <span onClick={() => handleRemove(p._id)} className="btn btn-sm float-right"><DeleteOutlined className="text-danger"/></span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Wishlist;