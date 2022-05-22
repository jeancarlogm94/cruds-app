import React from "react";

const UsersList = ({ users, selectUser, removeUser }) => {
  return (
    <div>
      <ul className="users-list">
        {users.map((user) => (
          <li key={user.id}>
            <div>
              <i className="fa-solid fa-user"></i>
              <span>
                <b>
                  {user.first_name} {user.last_name}
                </b>
              </span>
            </div>
            <div>
              <i className="fa-solid fa-envelope"></i>
              <span> {user.email}</span>
            </div>
            <div>
              <i className="fa-solid fa-cake-candles"></i>
              <span>{user.birthday}</span>
            </div>
            <div className="btns-list">
              <i
                className="fa-solid fa-pen"
                onClick={() => selectUser(user)}
              ></i>
              <i
                className="fa-solid fa-trash"
                onClick={() => removeUser(user.id)}
              ></i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
