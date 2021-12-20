/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-restricted-imports */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faUsers,
  faUser,
  faTasks,
  faFileContract,
  faFileInvoice,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import PrivateComponent from './PrivateComponent';
import logo from '../assets/Skynet.png';

const NavbarLinks = () => (
  <>
    <Nav className='me-auto'>
      <PrivateComponent roleList={['Administrador', 'Lider']}>
        <Nav.Link href='/usuarios'>
          <FontAwesomeIcon icon={faUsers} />
          Usuarios
        </Nav.Link>
      </PrivateComponent>
      <PrivateComponent roleList={['Estudiante', 'Administrador', 'Lider']}>
        <Nav.Link href='/usuario'>
          <FontAwesomeIcon icon={faUser} /> Perfil Usuario{' '}
        </Nav.Link>
      </PrivateComponent>
    </Nav>
    <Nav>
      <Nav.Link href='/proyectos'>
        <FontAwesomeIcon icon={faTasks} /> Proyectos
      </Nav.Link>
      <NavDropdown title='+' id='collasible-nav-dropdown'>
        <PrivateComponent roleList={['Administrador', 'Lider']}>
          <NavDropdown.Item href='/proyectos/avances'>
            <FontAwesomeIcon icon={faFileContract} /> Avances
          </NavDropdown.Item>
        </PrivateComponent>
        <NavDropdown.Divider />
        <PrivateComponent roleList={['Administrador', 'Lider', 'Estudiante']}>
          <NavDropdown.Item href='/proyectos/inscripciones'>
            <FontAwesomeIcon icon={faFileInvoice} /> Inscripciones
          </NavDropdown.Item>
        </PrivateComponent>
      </NavDropdown>
    </Nav>
    <Nav>
      <Logout />
    </Nav>
  </>
);
const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    setToken(null);
  };
  return (
    <Link className='Exit' onClick={() => deleteToken()} to='/auth/login'>
      <FontAwesomeIcon icon={faSignOutAlt} />
      <span>Cerrar Sesión</span>
    </Link>
  );
};
const Logo = () => (
  <div className='logo d-inline-block align-top'>
    <img src={logo} alt='Logo Skynet' className='logoImg' />
  </div>
);
const Navigation = () => (
  <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
    <Container>
      <Navbar.Brand href='/'>
        <Logo />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <NavbarLinks />
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navigation;
