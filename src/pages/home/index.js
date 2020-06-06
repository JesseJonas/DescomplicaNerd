import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 

import firebase from '../../config/firebase';

import './home.css';

import banner from '../../assets/banner.png';
import Card from '../../components/card';

function Home(props) {

  const [loading, setLoading] = useState(1);
  const[boxPosts, setBoxPosts] = useState([]);
  const userEmail = (useSelector(state => state.userEmail));

  useEffect(() => {
    let newsList = [];

    if(props.match.params.param){
      firebase.firestore().collection('posts').where('userEmail', '==', userEmail).get()
      .then((result) => {
        result.docs.forEach(doc => {
          newsList.push({
            id: doc.id,
            ...doc.data()
          });
          setLoading(0);
        });
        setBoxPosts(newsList);
      });
    } else {
      firebase.firestore().collection('posts').get()
      .then((result) => {
        result.docs.forEach(doc => {
          newsList.push({
            id: doc.id,
            ...doc.data()
          });
          setLoading(0);
        });
        setBoxPosts(newsList);
      });
    }

    console.log('Descomplica Nerd - Tecnologia ao seu alcance')

  }, []);

  return(
    <>
      <div>
        {
          // Loading enquanto carrega a página
          loading 
          ?
          <div class="text-center my-5">
            <div class="spinner-grow"  role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          :
          <>
          <h1 className="h1-home">Descomplica Nerd - tutoriais e dicas sobre tecnologia</h1>

            <div>
              {
                boxPosts.map(post => <Card
                                      key={post.id}
                                      id={post.id}
                                      img={post.image}
                                      title={post.title}
                                      views={post.views}
                                      />)
              }
            </div>
          </>
        }

      </div>
    </>
  );
}

export default Home;