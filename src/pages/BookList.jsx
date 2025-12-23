import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, viewBook } from "../features/bookSlice";
import { FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function BookList() {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.bookList);

  useEffect(() => {
    dispatch(viewBook());
  }, [dispatch]);

  const Trash = (id) => {
    if (confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id));
      alert("Book deleted");
    }
  };

  if (!bookList || bookList.length === 0) {
    return (
      <div className="container app-main">
        <div className="text-center py-5">
          <i className="bi bi-book empty-state-icon"></i>
          <h4 className="mt-3">No books found</h4>
          <p className="text-muted-soft">
            Start by adding some books to your collection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1"> Book Collection</h3>
          <small className="text-muted">
            Total Books: {bookList?.length || 0}
          </small>
        </div>

        <NavLink to="/addBook" className="btn btn-primary px-4">
          + Add Book
        </NavLink>
      </div>

      {(!bookList || bookList.length === 0) && (
        <div className="text-center py-5">
          <h5 className="text-muted">No books found</h5>
          <p className="text-secondary">Start by adding your first book</p>
        </div>
      )}

      <div className="row g-4">
        {bookList.map((book) => (
          <div key={book.id} className="col-lg-4 col-md-6">
            <div className="card h-100 border-0 shadow-sm rounded-4 book-card-hover">
              <div
                className="card-header border-0 text-white rounded-top-4"
                style={{
                  background: "linear-gradient(135deg,#1d2671,#c33764)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-light text-dark">
                    {book.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>

              <div className="card-body">
                <h5 className="fw-bold text-dark mb-1">{book.title}</h5>
                <p className="text-muted mb-2">by {book.author}</p>

                <p className="small text-secondary">
                  {book.description || "No description available."}
                </p>

                <div className="row text-muted small mt-3">
                  <div className="col-6">
                    <strong>Genre</strong>
                    <br />
                    <span className="text-capitalize">
                      {book.genre?.replace("-", " ") || "NA"}
                    </span>
                  </div>
                  <div className="col-6">
                    <strong>Year</strong>
                    <br />
                    {book.publicationYear || "NA"}
                  </div>
                </div>
              </div>

              <div className="card-footer bg-white border-0 d-flex justify-content-between">
                <button
                  className="btn btn-outline-danger btn-sm px-3"
                  onClick={() => Trash(book.id)}
                >
                  <FaTrash />
                </button>

                <NavLink
                  to={`/UpdateBook/${book.id}`}
                  className="btn btn-outline-warning btn-sm px-3"
                >
                  Update
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
