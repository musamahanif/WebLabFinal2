import React, { Fragment } from "react";

const BookInfo = ({ books, dispatch, bookDetails }) => {
  return (
    <Fragment>
      <h2>Book Details</h2>
      <div className="alert alert-secondary" role="alert">
        {books.length == 0 ? (
          <p className="text-danger">
            There is no book selected yet. Please select!
          </p>
        ) : (
          <>
            <h3>{bookDetails?.title}</h3>
            <h4>-{bookDetails?.author}</h4>
            <p>{bookDetails?.description}</p>
          </>
        )}
      </div>
      {/* <div>
        <p className='fw-bold'>Title:</p>
        <p className='fw-light'>Description:</p>
        <p className='fst-italic'>Price:</p>
      </div> */}
    </Fragment>
  );
};

export default BookInfo;
