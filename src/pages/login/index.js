import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';

import './login.css';
import Banner from '../../assets/banner.png';

function Login() {
  const dispatch = useDispatch();

  const[email, setEmail] = useState('');
  const[pass, setPass] = useState('');
  const[msgType, setMsgType] = useState('');
  const[msg, setMsg] = useState('');
  const [loading, setLoading] = useState('');
  const userName = [];

  function login(){
    setLoading(1);

    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => {
      setMsgType('success');
      setLoading(0);
      
      let uid = firebase.auth().currentUser.uid;

      // Buscando o nome do user na database baseado no seu uid
      var ref = firebase.database().ref(`users/${uid}`)
      ref.once("value")
      .then((snapshot) => {
        var name = snapshot.child("name").val();
        userName.push(name);
      })

      setTimeout(() => {
        dispatch({
          type: 'LOG_IN',
          userEmail: email,
          userName: userName[0]
        });
        window.location.reload();
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
      <form className="login-content">
          <h1>Login</h1>
          <img src={Banner} alt="Banner"/>
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
            loading ?
            <button className="btn btn-dark btn-block mt-3" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
            </button> 
            :
            <button 
              type="button" 
              className="btn-login mt-3"
              onClick={login}>
              Entrar
            </button>
          }

          <div className="register-here">
            <span>Não tem uma conta? <Link to="/cadastrar">Cadastre-se aqui</Link></span>
            <span><Link to="/recuperarsenha">Recupere sua senha</Link></span>
          </div>

        </form>

        
        <div className="msg-type">
          {msgType === 'success' && <strong className="text-success">Login efetuado com sucesso!</strong>}
          {msgType === 'error' && <strong className="text-danger">{msg}</strong>}
        </div>

    </div>
  );
}

export default Login;