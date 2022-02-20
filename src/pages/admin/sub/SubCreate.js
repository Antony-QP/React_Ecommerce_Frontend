import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createSub, getSubs, removeSub } from "../../../actions/sub";
import { getCategories } from "../../../actions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import { LocalSearch } from "../../../components/forms/LocalSearch";

// Create Category
const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [subs, setSubs] = useState([]);

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  //   Get Categories
  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name: name, parent: category }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}"Sub category has been created`);
        loadSubs();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you would like to delete?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          loadCategories();
          toast.error(`${res.data.msg}`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data);
            setLoading(false);
          }
        });
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading..</h4>
          ) : (
            <h4>Create Sub Category</h4>
          )}

          <div className='form-group'>
            <label>Main Category</label>
            <select
              name='category'
              className='form-control'
              onChange={(e) => setCategory(e.target.value)}>
              <option>Please Select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {subs.filter(searched(keyword)).map((s) => (
            <div className='alert alert-secondary' key={s._id}>
              {s.name}
              <span
                className='btn btn-sm float-right text-danger'
                onClick={() => handleRemove(s.slug)}>
                <DeleteOutlined />
              </span>{" "}
              <Link to={`/admin/sub/${s.slug}`}>
                <span className='btn btn-sm float-right text-danger text-warning'>
                  <EditOutlined />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
