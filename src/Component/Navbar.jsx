import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function Navbar() {
  const location = useLocation();
  const [isAuth, setAuth] = useState(null);
  const [userData, setUserData] = useState(null);

  const signup = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        alert("Signed in successfully!");
        localStorage.setItem("userId", result.user.uid);
        setAuth(result.user);
        setUserData(result.user);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuth(user);
      setUserData(user);
    });
    return () => unsub();
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => {
        alert("User logged out");
        setAuth(null);
        setUserData(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{
        background: "linear-gradient(135deg,#1d2671,#c33764)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          to="/"
        >
          <i className="bi bi-book fs-4"></i>
          <span>BookStore</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link px-3 rounded-pill ${
                  location.pathname === "/"
                    ? "bg-white text-dark fw-semibold"
                    : ""
                }`}
              >
                Books
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/addBook"
                className={`nav-link px-3 rounded-pill ${
                  location.pathname === "/addBook"
                    ? "bg-white text-dark fw-semibold"
                    : ""
                }`}
              >
                Add Book
              </Link>
            </li>

            <li className="nav-item">
              {isAuth == null ? (
                <button
                  onClick={signup}
                  className="btn btn-light btn-sm px-3 fw-semibold"
                >
                  <i className="bi bi-google me-2"></i>
                  Sign In
                </button>
              ) : (
                <button
                  onClick={logout}
                  className="btn btn-outline-light btn-sm px-3"
                >
                  Logout
                </button>
              )}
            </li>

            {isAuth && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  {userData?.photoURL ? (
                    <img
                      src={userData.photoURL}
                      alt="profile"
                      className="rounded-circle"
                      style={{
                        width: "36px",
                        height: "36px",
                        objectFit: "cover",
                        border: "2px solid white",
                      }}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center fw-bold"
                      style={{ width: "36px", height: "36px" }}
                    >
                      {userData?.displayName?.charAt(0) ||
                        userData?.email?.charAt(0) ||
                        "U"}
                    </div>
                  )}
                  <span className="d-none d-md-inline">
                    {userData?.displayName?.split(" ")[0] || "User"}
                  </span>
                </a>

                <ul
                  className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-4"
                  style={{ minWidth: "260px" }}
                >
                  <li className="px-3 py-3 bg-light">
                    <div className="fw-semibold">
                      {userData?.displayName || "User"}
                    </div>
                    <small className="text-muted text-truncate d-block">
                      {userData?.email}
                    </small>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger fw-semibold"
                      onClick={logout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
