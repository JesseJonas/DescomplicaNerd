import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './store';

// import { store, persistor } from './store';
// import { PersistGate } from 'redux-persist/integration/react';

import Navbar from './components/navbar';
import Footer from './components/footer';

import Home from './pages/home';
import About from './pages/about';
import Dashboard from './pages/dashboard';
import PostView from './pages/postview';
import NewPost from './pages/newpost';

import Login from './pages/login';
import Signup from './pages/signup';
import RecoverPassword from './pages/recoverpassword';

import NotFound from './pages/notfound';

function App() {
  return(
    <Provider store={store}>
      <BrowserRouter>
      <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/posts/:param" component={Home}/>

          <Route exact path="/sobre" component={About}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/detalhes/:id" component={PostView}/>
          
          <Route exact path="/novopost" component={NewPost}/>
          <Route exact path="/editarpost/:id" component={NewPost}/>

          <Route exact path="/login" component={Login}/>
          <Route exact path="/cadastrar" component={Signup}/>
          <Route exact path="/recuperarsenha" component={RecoverPassword}/>

          <Route exact path="/paginanaoencontrada" component={NotFound}/>
          <Route component={NotFound} />
        </Switch>
        <Footer/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;