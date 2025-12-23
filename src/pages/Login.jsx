import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function Login() {
  const navigate = useNavigate();

  const signup = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        alert("Signed in successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error("Sign in error", err);
        alert("Sign in failed. Please try again.");
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        alert("User logged out");
      })
      .catch((err) => {
        console.error("Logout error", err);
        alert("Logout failed. Please try again.");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in", user);
      }
    });
    return () => unsubscribe();
  }, []);

  const user = auth.currentUser;

  return (
  <div
    className="min-vh-100 d-flex align-items-center justify-content-center"
    style={{
      background: "linear-gradient(135deg,#1d2671,#c33764)",
    }}
  >
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6">
          <div
            className="card border-0 shadow-lg rounded-4"
            style={{
              backdropFilter: "blur(10px)",
              background: "rgba(255,255,255,0.95)",
            }}
          >
            <div className="card-body p-4 text-center">

              {/* Title */}
              <h3 className="fw-bold mb-2"> BookStore</h3>
              <p className="text-muted mb-4">
                Sign in to manage your book collection
              </p>

              {user ? (
                <>
                  {/* Logged In */}
                  <div className="mb-3">
                    <div className="fw-semibold">
                      Welcome,
                    </div>
                    <div className="text-primary">
                      {user.displayName || user.email}
                    </div>
                  </div>

                  <button
                    onClick={logout}
                    className="btn btn-outline-danger w-100 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* Google Sign In */}
                  <button
                    onClick={signup}
                    className="btn btn-light border w-100 py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                  >
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google"
                      width="20"
                    />
                    <span className="fw-semibold">
                      Continue with Google
                    </span>
                  </button>

                  <p className="text-muted small mt-3">
                    Secure Google authentication
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Footer text */}
          <p className="text-center text-white small mt-3">
            &copy; {new Date().getFullYear()} BookStore
          </p>
        </div>
      </div>
    </div>
  </div>
);

}

export default Login;
