import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/Authentication/actions/authenticationAction';
import logo from '../assets/book.jpg';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const user = useSelector((state) => state.authentication.user);

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(loginUser(username, password))
      .then(() => {

        navigate('/dashboard');
        console.log("user is: ", user)
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="bg-light" style={{ width: '350px', border: '1px solid black', padding: '30px' }}>
        <div className='d-flex justify-content-center'>
          <img src={logo} alt="Logo" />
        </div>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="username">
            <h4 className="my-4">Login</h4>
          </Form.Group>
          <Form.Group controlId="username" className='my-2'>
            <Form.Control
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group controlId="password" className='my-2'>
            <Form.Control
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group controlId="password" className='my-2'>
            <Button className="w-100" variant="primary" type="submit">
              Login
            </Button>
          </Form.Group>
          <Form.Group controlId="password" className='my-2'>
            <div className="w-100">
              <Link to="/register">Don't have an account. Register</Link>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Login;
