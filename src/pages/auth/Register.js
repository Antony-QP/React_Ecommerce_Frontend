import React, { useState, useEffect } from "react";
import { auth } from "../../firebase.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL);
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    toast.success(
      `Confirmation email has beeb sent to ${email}. Click the link to complete you registration`
    );

    // Save email in local storage
    window.localStorage.setItem("emailForRegistration", email);

    // Clear state
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='form-control'
        id=''
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        placeholder='Please enter your email address to register'
      />
      <br />
      <button type='submit' className='btn btn-raised'>
        REGISTER {email && "/ " + email.toUpperCase()}
      </button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
