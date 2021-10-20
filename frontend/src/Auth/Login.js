import React, { useState, useEffect } from "react";
import { login_api } from "../API";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      window.location="/";
    }
  }, []);
  
  // logout the user
  // const handleLogout = () => {
  //   setUser({});
  //   setEmail("");
  //   setPassword("");
  //   localStorage.clear();
  //   window.location.reload();
  // };

  // login the user
  const handleSubmit = async e => {
    e.preventDefault();
    const user = { email, password };
    // send the email and password to the server
    console.log(user);
    const response = await axios.post(
      login_api,
      user,
    );
    // set the state of the user
    console.log(response);
    setUser(response.data);
    // store the user in localStorage
    localStorage.setItem("user", JSON.stringify(response.data));
    window.location.reload();
  };
  console.log(user);

  // // if there's a user show the message below
  // if (user) {
  //   return (
  //     <div>
  //       {user.firstName} is loggged in
  //       <button onClick={handleLogout}>logout</button>
  //     <button type='button' onClick={() => <Dashboard user = {user} />}>Go to Dashboard</button>
  //     </div>
  //   );
  // }

  // if there's no user, show the login form
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email: </label>
        <input
          type="text"
          value={email}
          placeholder="enter a email"
          onChange={({ target }) => setEmail(target.value)}
        />
        <div>
          <label htmlFor="password">password: </label>
          <input
            type="password"
            value={password}
            placeholder="enter a password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
