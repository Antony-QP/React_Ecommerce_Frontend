import React from "react";

const ProductUpdateForm = ({ handleSubmit, handleOnChange, values, categories }) => {
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    brand,
    color,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Title</label>
        <input
          type='text'
          name='title'
          id=''
          className='form-control'
          value={title}
          onChange={handleOnChange}
        />
      </div>

      <div className='form-group'>
        <label>Description</label>
        <input
          type='text'
          name='description'
          id=''
          className='form-control'
          value={description}
          onChange={handleOnChange}
        />
      </div>

      <div className='form-group'>
        <label>Price</label>
        <input
          type='text'
          name='price'
          id=''
          className='form-control'
          value={price}
          onChange={handleOnChange}
        />
      </div>

      <div className='form-group'>
        <label>Shipping</label>
        <select
          value={shipping === "yes" ? "yes" : "no"}
          name='shipping'
          className='form-control'
          onChange={handleOnChange}>
          <option value='Yes'>Yes</option>
          <option value='No'>No</option>
        </select>
      </div>

      <div className='form-group'>
        <label>Quantity</label>
        <input
          type='text'
          name='quantity'
          id=''
          className='form-control'
          value={quantity}
          onChange={handleOnChange}
        />
      </div>

      <div className='form-group'>
        <label>Brand</label>
        <select
          value={brand}
          name='brand'
          className='form-control'
          onChange={handleOnChange}>
          {brands.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className='form-group'>
        <label>Category</label>
        <select
          name='category'
          className='form-control'
          onChange={handleOnChange}
          value={category._id}>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))} 
        </select>
      </div>

      <div className='form-group'>
        <label>Color</label>
        <select
          value={color}
          name='color'
          className='form-control'
          onChange={handleOnChange}>
          <option>Please Select</option>
          {colors.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      <button className='btn btn-outline-info'>Save</button>
    </form>
  );
};

export default ProductUpdateForm;
