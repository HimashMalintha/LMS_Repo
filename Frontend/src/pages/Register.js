import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/Authentication/actions/authenticationAction'; // Make sure you have this action defined
import logo from '../assets/book.jpg';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (event) => {
    event.preventDefault();

    dispatch(registerUser(username, email, password))
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="bg-light" style={{ width: '350px', border: '1px solid black', padding: '30px' }}>
        <div className='d-flex justify-content-center'>
          <img src={logo} alt="Logo" />
        </div>
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="username">
            <h4 className="my-4">Register</h4>
          </Form.Group>
          <Form.Group controlId="username" className='my-2'>
            <Form.Control
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              required
            />
          </Form.Group>
          <Form.Group controlId="email" className='my-2'>
            <Form.Control
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              required
            />
          </Form.Group>
          <Form.Group controlId="password" className='my-2'>
            <Form.Control
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Group controlId="register" className='my-2'>
            <Button className="w-100" variant="primary" type="submit">
              Register
            </Button>
          </Form.Group>
          <Form.Group controlId="login" className='my-2'>
            <div className="w-100">
              <Link to="/login">Already have an account? Login</Link>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Register;
