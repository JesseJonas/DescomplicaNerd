import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';

import './recoverpassword.css';

import Banner from '../../assets/banner.png';

function RecoverPassword() {

  const[email, setEmail] = useState('');
  const[msg, setMsg] = useState('');
  const [loading, setLoading] = useState('');

  function passwordRecovery(){
    setLoading(1);

    firebase.auth().sendPasswordResetEmail(email)
    .then((result) => {
      setMsg(`Link de redefinição de senha enviado para: ${email}. Verifique sua caixa de entrada.`);
      setLoading(0);
    })
    .catch((error) => {
      setMsg('Verifique se o email está correto. (Especificação do erro: ' + error + ').');
      setLoading(0);
    })
  }
  
  return(
    <div className="recover-content">
      <form className="text-center">
        <h1>Recuperar senha</h1>

        <img src={Banner} alt="Banner"/>
        <input 
          type="email" 
          className="form-control mt-3" 
          placeholder="Informe seu email"
          onChange={(e) => setEmail(e.target.value)}/>


        {
          loading ?
          <button className="btn btn-dark btn-block mt-3" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
          </button> 
          :
          <button 
            type="button" 
            className="btn-register mt-3"
            onClick={passwordRecovery}>
            Recuperar
          </button>
        }

        <div className="msg-recover mt-2">
          <span>{msg}</span>
        </div>
      </form>

      <Link to="/">Volte para a página inicial</Link>

    </div>
  );
}

export default RecoverPassword;