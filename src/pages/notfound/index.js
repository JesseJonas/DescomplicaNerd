import React from 'react';
import { Link } from 'react-router-dom';

import './notfound.css';

import image404 from '../../assets/image404.png';
function NotFound() {
  return(
    <div className="page404">
      <h1>ERRO 404 - Página não encontrada</h1>
      <img src={image404} alt=""/>
      <Link to="/">Volte para a página inicial</Link>
    </div>
  );
}

export default NotFound;