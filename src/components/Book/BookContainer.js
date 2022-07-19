import React, { Fragment, useEffect, useState } from "react";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, getBook } from "../../store/bookSlice";
import "./book.css";

const PostContainer = () => {
  const dispatch = useDispatch();
  const { books, isLoading, bookDetails } = useSelector((state) => state.books);
  const { isLogged } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList isLogged={isLogged} isLoading={isLoading} books={books} />
        </div>
        <div className="col side-line">
          <BookInfo
            books={books}
            bookDetails={bookDetails}
            dispatch={dispatch}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
