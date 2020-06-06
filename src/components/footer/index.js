import React from 'react';
import { Link } from 'react-router-dom';

import { FaReact } from 'react-icons/fa'; 

import './footer.css';

function Footer() {
  return(
    <footer className="text-muted text-center footer-content">
      <div>
      <p className="mt-3 copyrights">&copy; Descomplica Nerd</p>

      <ul className="list-inline">
        <li className="list-inline-item">
          <Link to="/sobre">
            <FaReact size={20} className="mr-1 i-react"/> 
            <span>Sobre</span>
          </Link>
        </li>
      </ul>
      </div>
    </footer>
  );
}

export default Footer;