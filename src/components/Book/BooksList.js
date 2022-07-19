import React from "react";
import { useDispatch } from "react-redux";
import { deleteBook, getBook } from "../../store/bookSlice";

const BooksList = ({ isLoading, books, isLogged }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? (
        <h4>is loading...</h4>
      ) : books.length > 0 ? (
        <ul className="list-group">
          {books.map((book) => (
            <li
              key={book.id}
              className="list-group-item d-flex  justify-content-between align-items-center"
            >
              <div>{book.title}</div>
              <div className="btn-group" role="group">
                <button
                  disabled={!isLogged}
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch(getBook(book.id));
                  }}
                >
                  Read
                </button>
                <button
                  disabled={!isLogged}
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    dispatch(deleteBook(book.id));
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h3 className="text-danger">You got no books :"(</h3>
      )}
    </div>
  );
};

export default BooksList;
