import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';
import './postview.css';

function Postview(props){

  // Verificar se o usuário logado é o dono do posto com o usestate
  // Os botões de edição e deleçã só aparecerão se for o mesmo publicador
  const userLogged = (useSelector(state => state.userEmail));

  const[post, setPost] = useState('');
  const[urlImage, setUrlImage] = useState('');
  const[image, setImage] = useState('');
  const[loadingImage, setLoadingImage] = useState(1);

  // SErá usado para o Redirect quando deleting(1)
  const[deleting, setDeleting] = useState(0);

  useEffect(() => {
    firebase.firestore().collection('posts').doc(props.match.params.id).get()
    .then((result => {
      setPost(result.data());
      setImage(result.data().image);

      // Referenciando a imagem no storage
      firebase.storage().ref(`images/${result.data().image}`).getDownloadURL()
      .then(url => {
        setUrlImage(url);
        setLoadingImage(0);
      });
    }));
  }, []);

  // Deletar um post
  function postDelete(){
    firebase.firestore().collection('posts').doc(props.match.params.id).delete()
    .then(() => {
      setDeleting(1);
      imageDelete();
      alert('Publicação excluída!')
    })
  }

  // função para apagar a imagem - chamada no postDelete()
  function imageDelete(){
    firebase.storage().ref(`images/${image}`).delete()
  }

  return(
    <>
      {
        deleting ?
        <Redirect to="/"/> 
        : 
        null
      }

      {
        loadingImage === 1 ?
        <div className="text-center mt-5">
          <div className="spinner-grow text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        :
        <div>
          <img src={urlImage} alt="Banner" className="banner-postview mx-auto"/>          

          <div className="title-content text-center">
            <h1>{post.title}</h1>
          </div>

          <div className="content-content" dangerouslySetInnerHTML={{__html: post.description}}></div>

          <div className="text-center">
            <span>Autor: {post.userName}</span>
          </div>

          <div>
            { 
              // Os botões de edição e deleçã só aparecerão se for o mesmo publicador
              userLogged === post.userEmail &&
              <div className="buttons-action text-center mt-5">
                <span className="i-edit"><Link to={`/editarpost/${props.match.params.id}`}>Editar</Link></span>
                <span className="i-delete" onClick={postDelete}>Apagar</span>
              </div>
            }
          </div>
          
        </div>
      }
    </>
  )
}

export default Postview;