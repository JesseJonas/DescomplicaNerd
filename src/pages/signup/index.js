import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';

import './signup.css';
import Banner from '../../assets/banner.png';

function Signup() {

  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[pass, setPass] = useState('');
  const[msgType, setMsgType] = useState('');
  const[msg, setMsg] = useState('');
  const [loading, setLoading] = useState('');

  // Quando finalizar o cadastro, enviar para a home
  const dispatch = useDispatch();

  function userRegister(){
    setLoading(1);

    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(() => {
      setMsgType('success');
      setLoading(0);

      let uid = firebase.auth().currentUser.uid;

      firebase.database().ref('users').child(uid).set({
        name: name
      });

      setTimeout(() => {
        dispatch({
          type: 'LOG_IN',
          userEmail: email,
          userName: name,
        });
        setLoading(0);
      }, 1500);

    })
    .catch((error) => {
      setMsgType('error');
      setMsg('' + error);
      setLoading(0);
    })
    
    
  }

  return(
    <div>
      {
        useSelector(state => state.userLogged) > 0 ?
        <Redirect to="/"/> : null
      }
      <form className="signup-content">
          <h1 className="h1-signup">Cadastro</h1>
          <img src={Banner} alt="Banner" className="banner-signup"/>

          <input
            type="text" 
            className="form-control mt-3"
            placeholder="Nome exibido nos posts. Ex: João da Silva"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email" 
            className="form-control mt-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password" 
            className="form-control mt-3"
            placeholder="Senha"
            onChange={(e) => setPass(e.target.value)}
          />

          {
            loading === 1 ? 
            <button className="btn btn-dark btn-block mt-3" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
            </button> 
            :
            <button 
              type="button" 
              className="btn-signup mt-3"
              onClick={userRegister}>
              Cadastrar
            </button>
          }

          <div className="register-here">
            <span><Link to="/login">Faça seu login</Link></span>
            <span><Link to="/recuperarsenha">Recupere sua senha</Link></span>
          </div>
        </form>

        <div className="msg-type">
          {msgType === 'success' && <strong className="text-success">Cadastro efetuado com sucesso!</strong>}
          {msgType === 'error' && <strong className="text-danger">{msg}</strong>}
        </div>
    </div>
  );
}

export default Signup;