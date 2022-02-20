import React, {useState} from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from 'react-router-dom'

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  let history = useHistory()
  let {slug} = useParams()

  const handleModal = () =>{
    if(user && user.token){
        setModalVisible(true)
    }else{
        // Redirect to product that was being viewed
        history.push({
            pathname: "/login",
            state: { from: `/product/${slug}`}
        })
    }
  }

  return (
    <>
      <div className='' onClick={handleModal}>
        <StarOutlined className='text-danger' />
        <br />
        {user ? "Leave rating" : "Login to leave a rating"}
      </div>
      <Modal
        title='Leave your rating'
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thank you for leaving a review")
        }}
        onCancel={() => setModalVisible(false)}
        >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
