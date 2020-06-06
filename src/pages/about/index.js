import React from 'react';

import './about.css';

function About() {
  return(
    <div>
      <h1 className="h1-about">Sobre o Descomplica Nerd</h1>

      <div className="about-content">
        <h2 className="h2-about">Sobre</h2>
        <p>
          Site com temática voltada para tecnologia e desenvolvimento. Serão disponibilizados conteúdos simples, tutoriais, dicas, entre outros.
        </p>
        <p>
          Plataforma 100% construído em ReactJS, utilizando Bootsrap para desenvolvimento de alguns elementos visuais, React Redux e Firebase (usado com BAAS e Hosting);
        </p>
      </div>
    </div>
  );
}

export default About;