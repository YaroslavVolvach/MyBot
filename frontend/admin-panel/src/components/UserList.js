import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
} from '@mui/material';
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
    <Container>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.username || 'No username'}</TableCell>
                <TableCell>{user.name || 'No name'}</TableCell>
                <TableCell>{user.telegramId}</TableCell>
                <TableCell>{user.isBanned ? 'Banned' : 'Not Banned'}</TableCell>
                <TableCell>
                  {user.isBanned ? (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleUnbanUser(user.telegramId)}
                    >
                      Unban
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleBanUser(user.telegramId)}
                    >
                      Ban
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserList;
