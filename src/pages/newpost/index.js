import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import { Redirect } from 'react-router-dom';

import './newpost.css';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/pt-br';

function NewPost(props){
  const storage = firebase.storage();
  const db = firebase.firestore();

  const[title, setTitle] = useState('');
  const[currentImage, setCurrentImage] = useState('');
  const[newImage, setNewImage] = useState('');
  const[description, setDescription] = useState('')
  const[msgType, setMsgType] = useState('');
  const[msg, setMsg] = useState('');

  const userEmail = (useSelector(state => state.userEmail));
  const userName = (useSelector(state => state.userName));
  const[publishing, setPublishing] = useState(0);

  useEffect(() => {
    if(props.match.params.id){
      firebase.firestore().collection('posts').doc(props.match.params.id).get()
      .then((result) => {
        setTitle(result.data().title);
        setCurrentImage(result.data().image);
        setDescription(result.data().description);
      })
    }
  }, []);

  //Função resposável por publicar um novo artigo
  function publishNewPost(){
    // Prefixo definido para image, reduzindo as chances de nomes iguas no storage
    let imagePrefixName = Math.floor(Math.random() * 9999);

    if(newImage === '' || title === '' || description === ''){
      setMsgType('error');
      setMsg('Algum dos campos de publicação estão vazios. Verifique-os.');
    } else {
      storage.ref(`images/${imagePrefixName}-` + newImage.name).put(newImage);
  
      db.collection('posts').add({
        title: title,
        image: `${imagePrefixName}-` + newImage.name,
        description: description,
        userEmail: userEmail,
        userName: userName,
        views: 0,
        createdAt: new Date()
      })
      .then(() => {
        setMsgType('success');
        setMsg('Sucesso na sua publicação!');
        alert("Sucesso na sua publicação");
        setPublishing(1);
      })
      .catch((error) => {
        setMsgType('error');
        setMsg('' + error);
      })
    }
  }

  function editPost(){
    let imagePrefixName = Math.floor(Math.random() * 9999);

    if(title === '' || description === ''){
      setMsgType('error');
      setMsg('Algum dos campos de publicação estão vazios. Verifique-os.');
    } else {
      if(newImage){
        storage.ref(`images/${imagePrefixName}-` + newImage.name).put(newImage);
        currentImageDelete();
      }
  
      db.collection('posts').doc(props.match.params.id).update({
        title: title,
        image: newImage ? `${imagePrefixName}-` + newImage.name : currentImage,
        description: description,
        userEmail: userEmail,
        userName: userName,
        views: 0,
        createdAt: new Date()
      })
      .then(() => {
        setMsgType('success');
        setMsg('Sucesso na edição publicação!');
        alert("Sucesso na edição da publicação");
        setPublishing(1);

      })
      .catch((error) => {
        setMsgType('error');
        setMsg('' + error);
      })
    }
  }

  function currentImageDelete(){
    firebase.storage().ref(`images/${currentImage}`).delete()
  }

  return(
    <>
      {
        // Se o post for publicado, a página será redirecionada
        publishing && <Redirect to="/dashboard"/>
      }

      {
        // Só irá para esta página se houver um user logado cadastrado
        useSelector(state => state.userLogged) === 0 ?
        <Redirect to="/paginanaoencontrada"/>
        :
        <>
         <h1 className="h3 text-center my-3">Nova matéria</h1>
      
          <form className="newpost-content">
            <div className="form-group">
              
              <label>Imagem</label>
                <div className="input-group mb-3">
                  <input 
                    type="file" 
                    className="form-control file-input" 
                    onChange={(e) => setNewImage(e.target.files[0])}
                  />
                </div>

              <label>Título</label>
              <input 
                type="text" 
                value={title && title}
                className="form-control mb-3"
                onChange={(e) => setTitle(e.target.value)}/>

              <label>Descrição</label>
              <CKEditor className="form-control"
                config={{language: 'pt-br'}}
                editor={ ClassicEditor }
                data={description && description}
                onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  setDescription(data);
                }}
              />
            </div>

            <button
              type="button" 
              className="button mt-3"
              onClick={
                      props.match.params.id ? editPost
                      : publishNewPost
                      }>
              {props.match.params.id ? 'Atualizar post' : 'Publicar post'}
            </button>

          </form>

          <div className="text-center">
            {
              msgType === 'success' &&
              <strong>{msg}</strong>
            }
            {
              msgType === 'error' &&
              <strong>{msg}</strong>
            }
          </div>
        </>
      }

    </>
  );
}

export default NewPost;