import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import firebase from '../../config/firebase';

// Imagem usada enquanto ainda não carrega-se as imagens dos cards
import imageDefault from '../../assets/defaultimageposts.png';

import './card.css';

function Card({id, title, img}){

  const[urlImage, setUrlImage] = useState('');
  const[imgIsLoading, setImgIsLoading] = useState(0);

  useEffect(() => {
    firebase.storage().ref(`images/${img}`).getDownloadURL().then(url => setUrlImage(url))
    .then(() => {
      setImgIsLoading(1);
    })
  }, [img]);

  return(
    <div className="card-container">
        <div className="card mb-3">
          <img src={imgIsLoading ? urlImage : imageDefault} className="card-img-top" alt="Banner"/>

          <div className="card-body">
            <h5 className="card-title">{title}</h5>

            <p className="card-text link-button">
              <Link to={"/detalhes/"+id}>Leia mais</Link>
            </p>
          </div>

        </div>
      </div>
  );
}

export default Card;