import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <>
      <form className='form-inline' onSubmit={handleSubmit} action=''>
        <div className='form-group'>
          <input
            onChange={handleChange}
            type='search'
            name=''
            className='form-control mr-sm-2'
            value={text}
            placeholder='Search'
          />
        </div>

        <div className='form-group'>
          <SearchOutlined
            onClick={handleSubmit}
            style={{ cursor: "pointer" }}
            className='inline'
          />
        </div>
      </form>
    </>
  );
};

export default Search;
