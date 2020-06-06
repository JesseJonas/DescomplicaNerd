import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { FiLogIn, FiLogOut, FiEdit } from 'react-icons/fi'

import './navbar.css';

import LogoWhite from '../../assets/simplelogo.svg';

function Navbar() {

  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.userEmail);
  const userName = useSelector(state => state.userName);

  return(
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <Link className="navbar-brand" to="/">
          <img src={LogoWhite} size={35} alt="Logo" className="logo-white"/>
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {
          useSelector(state => state.userLogged) === 0 ?
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Descomplica Nerd | Home<span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item login-item">
                <Link className="nav-link" to="/login">
                  <FiLogIn/>
                  <small className="ml-1">Login</small>
                </Link>
              </li>
            </ul>
          </div>
          :
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Descomplica Nerd | Home<span className="sr-only">(current)</span></Link>
              </li>

              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <small>{userName}</small>
                </Link>

                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/dashboard">
                    <small>Dashboard</small>
                    <FiEdit className="ml-1"/>
                  </Link>

                  <div className="dropdown-divider"></div>

                  <Link 
                    className="dropdown-item" 
                    to="/"
                    onClick={() => dispatch({type: 'LOG_OUT'}, alert(`O email: ${userEmail} foi desconetado.`))}>
                    <small>Sair</small>
                    <FiLogOut className="ml-1"/>
                  </Link>
                  
                </div>
              </li>

            </ul>
          </div>
        }

      </nav>
    </div>
  );
}

export default Navbar;