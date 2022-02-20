import React from 'react'

const ProductCreateForm = ({ handleSubmit, handleOnChange, values }) => {

    const {
        title,
        description,
        price,
        categories,
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
                name='shipping'
                className='form-control'
                onChange={handleOnChange}>
                <option>Please Select</option>
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
                name='brand'
                className='form-control'
                onChange={handleOnChange}>
                <option>Please Select</option>
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
              onChange={handleOnChange}>
              <option>Please Select</option>
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
                name='color'
                className='form-control' 
                onChange={handleOnChange}>
                <option>Please Select</option>
                {colors.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            
            <button className="btn btn-outline-info">Save</button>
          </form>
    )
}

export default ProductCreateForm