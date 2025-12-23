import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addBook, updateBook, viewBook } from "../features/bookSlice";
import { useNavigate, useParams } from "react-router-dom";

function BookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookList = useSelector((state) => state.bookList);

  useEffect(() => {
    dispatch(viewBook());
  }, [dispatch]);

  useEffect(() => {
    if (id && bookList.length > 0) {
      const singleBook = bookList.find((book) => book.id === id);
      if (singleBook) reset(singleBook);
    }
  }, [id, bookList, reset]);

  const onSubmit = (data) => {
    if (!id) {
      dispatch(addBook(data));
      alert("Book added");
    } else {
      dispatch(updateBook({ id, ...data }));
      alert("Book updated");
    }
    reset();
    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">
          <div
            className="card border-0 shadow-lg rounded-4"
            style={{ backdropFilter: "blur(10px)" }}
          >
            <div
              className="card-header text-white rounded-top-4"
              style={{
                background: "linear-gradient(135deg, #1d2671, #c33764)",
              }}
            >
              <h4 className="mb-0 fw-semibold text-center">
                {id ? " Update Book Details" : " Add New Book"}
              </h4>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Book Title</label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      errors.title ? "is-invalid" : ""
                    }`}
                    placeholder="Enter book title"
                    {...register("title")}
                  />
                  {errors.title && (
                    <div className="invalid-feedback">
                      {errors.title.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Author</label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      errors.author ? "is-invalid" : ""
                    }`}
                    placeholder="Author name"
                    {...register("author")}
                  />
                  {errors.author && (
                    <div className="invalid-feedback">
                      {errors.author.message}
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Publication Year
                    </label>
                    <input
                      type="number"
                      className={`form-control ${
                        errors.publicationYear ? "is-invalid" : ""
                      }`}
                      placeholder="e.g. 2022"
                      {...register("publicationYear")}
                    />
                    {errors.publicationYear && (
                      <div className="invalid-feedback">
                        {errors.publicationYear.message}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Price (₹)</label>
                    <input
                      type="number"
                      className={`form-control ${
                        errors.price ? "is-invalid" : ""
                      }`}
                      placeholder="Enter price"
                      {...register("price")}
                    />
                    {errors.price && (
                      <div className="invalid-feedback">
                        {errors.price.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Genre</label>
                  <select className="form-select" {...register("genre")}>
                    <option value="">Choose genre</option>
                    <option value="fiction">Fiction</option>
                    <option value="non-fiction">Non-Fiction</option>
                    <option value="science-fiction">Science Fiction</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="mystery">Mystery</option>
                    <option value="biography">Biography</option>
                    <option value="history">History</option>
                    <option value="self-help">Self Help</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Brief description about the book..."
                    {...register("description")}
                  ></textarea>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="submit"
                    className="btn px-4 text-white"
                    style={{
                      background: "linear-gradient(135deg,#1d2671,#c33764)",
                    }}
                  >
                    {id ? "Update Book" : "Add Book"}
                  </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      onClick={() => reset()}
                    >
                      Reset
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookForm;
