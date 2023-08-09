import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {

    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      setIsRegistered(true);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err)
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social Sphere.</h1>
          <p>
          "SocialSphere is a dynamic social media app that empowers users to share
          their visual narratives through captivating images and engaging stories.
          Seamlessly follow friends, influencers, and discover new connections, as
          SocialSphere fosters a vibrant community where creativity knows no bounds."
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          {!err&&isRegistered && ( // Use curly braces and wrap the success message in parentheses
            <div>
              <p>Registration Successful!</p>
            </div>
          )}
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
