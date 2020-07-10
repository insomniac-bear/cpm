import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  return <React.Fragment>
    <nav className="deep-purple lighteen-1">
      <div className="nav-wrapper">
        <span className="brand-logo center">Управление проектами</span>
        <ul className="left hide-on-med-and-down">
          <li><NavLink to="/create">Создать проект</NavLink></li>
          <li><NavLink to="/projects">Проекты</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  </React.Fragment>
};
