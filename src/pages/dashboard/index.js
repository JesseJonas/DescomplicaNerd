import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { MdExitToApp } from 'react-icons/md';

import './dashboard.css';

function Dashboard() {
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.userEmail);

  return(
    <>
    {
       useSelector(state => state.userLogged) === 0 ?
       <Redirect to="/paginanaoencontrada"/>
       :
       <div className="dashboard-content">
      <h1>Dashboard</h1>
      
      <div>
        <div className="text-center">
          <strong>Logado com: {userEmail}</strong>
        </div>

        <div className=" buttons">
          <Link to="/novopost">Novo Post</Link>
          <Link to="/posts/meusposts">Meus Posts</Link>
          <Link to="/" onClick={() => dispatch({type: 'LOG_OUT'}, alert(`O email: ${userEmail} foi desconetado.`))}><MdExitToApp/></Link>
        </div>   
      </div>
    </div>
    }
    </>
  );
}

export default Dashboard;