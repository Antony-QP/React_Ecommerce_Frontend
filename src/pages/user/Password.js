import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

export const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    //

    await auth.currentUser.updatePassword(password)
    .then(() => {
        setLoading(false)
        setPassword("")
        toast.success("Paddword updated")
    })
    .catch(err => {
        setLoading(false)
        toast.error(err.message)
    })
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor=''>Password</label>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          className='form-control'
          placeholder='Enter new password'
          disabled={loading}
          value={password}
        />
        <button className='btn btn-primary' disabled={!password || loading || password.length < 6}>Submit</button>
      </div>
    </form>
  );

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col'>
          {loading ? <h1 className="danger">Loading</h1> : <h1>Password Update</h1>}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
