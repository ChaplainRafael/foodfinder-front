import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles/register.css";

const RegisterAndLogin = () => {
  const [page, setPage] = useState("login");

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  return (
    <main className="auth-page">
      <section className="auth-shell">
        {/* =========================================
            CHEF CAT
            ========================================= */}

        <div className="auth-character">
          <div className="auth-character-glow" />

          <span className="auth-character-badge">👨‍🍳 Kitchen ready</span>

          <img src="login-cat.png" alt="Chef cat" className="auth-cat" />

          <div className="auth-character-copy">
            {page === "login" ? (
              <>
                <span>Welcome back, chef!</span>
                <h1>Let's get cooking.</h1>
                <p>
                  Your kitchen is waiting. Log in and discover something
                  delicious.
                </p>
              </>
            ) : (
              <>
                <span>New to the kitchen?</span>
                <h1>Grab your apron.</h1>
                <p>
                  Create your Food Finder account and start building your
                  personal recipe collection.
                </p>
              </>
            )}
          </div>
        </div>

        {/* =========================================
            AUTH CARD
            ========================================= */}

        <div className="auth-form-card">
          <div className="auth-logo">
            <img src="food_finder_logo.png" alt="Food Finder" />
          </div>

          {page === "login" ? (
            <LoginForm API_BASE_URL={API_BASE_URL} setPage={setPage} />
          ) : (
            <RegisterForm API_BASE_URL={API_BASE_URL} setPage={setPage} />
          )}
        </div>
      </section>
    </main>
  );
};

/* =========================================
   REGISTER
   ========================================= */

const RegisterForm = ({ API_BASE_URL, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        username,
        password,
      });

      toast.success(res.data.message);
      setPage("login");
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }

      console.error("Registration error:", error);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleRegister}>
      <div className="auth-heading">
        <span className="auth-eyebrow">Join the kitchen</span>

        <h2>Create your account</h2>

        <p>Save your favorite recipes and keep your kitchen organized.</p>
      </div>

      <div className="auth-field">
        <label htmlFor="register-username">Username</label>

        <input
          id="register-username"
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="auth-field">
        <label htmlFor="register-password">Password</label>

        <input
          id="register-password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button className="auth-primary-button" type="submit">
        Create account
        <span>→</span>
      </button>

      <div className="auth-divider">
        <span>Already have an account?</span>
      </div>

      <button
        type="button"
        className="auth-secondary-button"
        onClick={() => setPage("login")}
      >
        Go to login
      </button>
    </form>
  );
};

/* =========================================
   LOGIN
   ========================================= */

const LoginForm = ({ API_BASE_URL, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful!");

      navigate("/");
    } catch (error) {
      toast.error("Invalid credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <div className="auth-heading">
        <span className="auth-eyebrow">Welcome back</span>

        <h2>Back to the kitchen</h2>

        <p>Log in to access your saved recipes and keep cooking.</p>
      </div>

      <div className="auth-field">
        <label htmlFor="login-username">Username</label>

        <input
          id="login-username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="auth-field">
        <label htmlFor="login-password">Password</label>

        <input
          id="login-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button className="auth-primary-button" type="submit">
        Login
        <span>→</span>
      </button>

      <div className="auth-divider">
        <span>New to Food Finder?</span>
      </div>

      <button
        type="button"
        className="auth-secondary-button"
        onClick={() => setPage("register")}
      >
        Create an account
      </button>
    </form>
  );
};

export default RegisterAndLogin;
