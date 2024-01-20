import React, { useEffect } from 'react';
import './Navigation.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { whenLogout } from '../../slices/user';
import { useNavigate } from 'react-router-dom';

function Navigation() {
  let dispatch = useDispatch();
  let { userData, success } = useSelector((state) => state.user);
  const navigate = useNavigate();

  let logout = () => {
    localStorage.clear();
    dispatch(whenLogout());
  };

  // useEffect(() => {
  //   if (success === false) navigate('/home');
  // }, [success]);

  return (
    <div className='navi-main'>
      <Navbar bg='' variant='dark' expand='lg' className='custom-shadow' style={{ height: '60px' }}>
        <Container>
          {/* <Navbar.Brand to='#home' className='apple-font'>
            React-Bootstrap
          </Navbar.Brand> */}
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' className='justify-content-center'>
            {!success ? (
              <Nav>
                <NavLink className='navigation-font nav-link' to='/home'>
                  Home
                </NavLink>
                <NavLink className='navigation-font nav-link' to='/signup'>
                  Sign Up
                </NavLink>
                <NavLink className='navigation-font nav-link' to='/login'>
                  Login
                </NavLink>
                <NavLink className='navigation-font nav-link' to='contact'>
                  Contact Us
                </NavLink>
              </Nav>
            ) : (
              <Nav>
                <NavLink className='navigation-font nav-link' to='/userDashboard'>
                  {userData.username}
                </NavLink>
                <NavLink className='navigation-font nav-link' to='/home'>
                  Home
                </NavLink>
                <NavLink className='navigation-font nav-link' onClick={logout}>
                  Logout
                </NavLink>
                <NavLink className='navigation-font nav-link'>Change Password</NavLink>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
