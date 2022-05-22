import axios from "axios";
import React, { useEffect, useState } from "react";

const UsersForm = ({ getUsers, userSelected, deselectUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    if (userSelected !== null) {
      setEmail(userSelected.email);
      setPassword(userSelected.password);
      setFirstName(userSelected.first_name);
      setLastName(userSelected.last_name);
      setBirthday(userSelected.birthday);
    } else {
      reset();
    }
  }, [userSelected]);

  const submit = (e) => {
    e.preventDefault();
    const user = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      birthday: birthday,
    };
    reset();
    if (userSelected !== null) {
      axios
        .put(
          `https://users-crud1.herokuapp.com/users/${userSelected.id}/`,
          user
        )
        .then(() => getUsers());
      deselectUser();
    } else {
      axios
        .post("https://users-crud1.herokuapp.com/users/", user)
        .then(() => getUsers())
        .catch((error) => console.log(error.response));
    }
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setBirthday("");
  };

  return (
    <div>
      <form onSubmit={submit} className="users-form">
        {userSelected !== null ? <h2>Edit User</h2> : <h2>New User</h2>}
        <div className="input-container">
          <i className="fa-solid fa-user"></i>
          <label htmlFor=""></label>
          <input
            placeholder="First Name"
            type="text"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <label htmlFor=""></label>
          <input
            placeholder="Last Name"
            type="text"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <div className="input-container">
          <i className="fa-solid fa-envelope"></i>
          <label htmlFor=""></label>
          <input
            placeholder="Email"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="input-container birthday">
          <i className="fa-solid fa-lock"></i>
          <label htmlFor=""></label>
          <input
            placeholder="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="input-container date">
          <i className="fa-solid fa-cake-candles"></i>
          <label htmlFor=""></label>
          <input
            type="date"
            id="date"
            onChange={(e) => setBirthday(e.target.value)}
            value={birthday}
          />
        </div>
        <button className="submit">Upload</button>
        {userSelected !== null && (
          <button className="cancel" type="button" onClick={deselectUser}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default UsersForm;
