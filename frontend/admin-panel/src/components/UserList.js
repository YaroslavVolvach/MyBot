import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/UserList.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleBanUser = async (userId) => {
    try {
      await axios.post(`${BASE_URL}/api/users/ban`, { telegramId: userId });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.telegramId === userId ? { ...user, isBanned: true } : user
        )
      );
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      await axios.post(`${BASE_URL}/api/users/unban`, { telegramId: userId });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.telegramId === userId ? { ...user, isBanned: false } : user
        )
      );
    } catch (error) {
      console.error('Error unbanning user:', error);
    }
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Name</th>
            <th>ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username || 'No username'}</td>
              <td>{user.name || 'No name'}</td>
              <td>{user.telegramId}</td>
              <td>{user.isBanned ? 'Banned' : 'Not Banned'}</td>
              <td>
                {user.isBanned ? (
                  <button
                    onClick={() => handleUnbanUser(user.telegramId)}
                    className="unban-button"
                  >
                    Unban
                  </button>
                ) : (
                  <button
                    onClick={() => handleBanUser(user.telegramId)}
                    className="ban-button"
                  >
                    Ban
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
