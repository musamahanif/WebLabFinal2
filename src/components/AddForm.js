import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { insertBook } from "../store/bookSlice";

const Addform = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const { isLogged } = useSelector((state) => state.auth);

  const [value, setValue] = useState({
    id: Math.random(),
    title: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(insertBook(value));
    resetForm();
  };

  const resetForm = () => {
    setValue({
      title: "",
      price: "",
      description: "",
    });
  };

  return (
    <div className="row">
      <div className="col-6 offset-3 mt-3">
        <h2>Insert Book</h2>
        <button
          onClick={() => {
            console.log(books);
          }}
        >
          show all the data
        </button>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="title"
              required
              onChange={(e) => {
                handleChange(e);
              }}
              value={value.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              name="price"
              type="number"
              className="form-control"
              id="price"
              required
              onChange={(e) => {
                handleChange(e);
              }}
              value={value.price}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea
              name="description"
              className="form-control"
              id="Description"
              rows="3"
              required
              onChange={(e) => {
                handleChange(e);
              }}
              value={value.description}
            ></textarea>
          </div>
          <button
            disabled={!isLogged}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addform;
