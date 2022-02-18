import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { NavLink } from 'react-router-dom';
import './login.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleDemoLogin = (e) => {
    dispatch(login('demo@aa.io', 'password'));
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-wrapper'>
      <h2 className='login-title'>ForTheGram</h2>
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <input
          className='email-input'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <input
          className='password-input'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button disabled={password.length > 5 ? false : true} className='login-submit-button' type='submit'>Login</button>
      </div>
      <button className='demo-user-button' onClick={handleDemoLogin}>Demo User</button>
      <p>Forgot your password? That's unfortunate</p>
    </form>
      <NavLink to='/sign-up/'>Signup</NavLink>
    </div>

  );
};

export default LoginForm;
