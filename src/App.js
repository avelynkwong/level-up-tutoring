import React from 'react';
import './App.css';
import VideoChat from './VideoChat';

function App (){
  return (
    <div className="app">
      <header>
        <h1>Tutoring Application</h1>
      </header>
      <main>
        <VideoChat />
      </main>
      
    </div>
  );
}

export default App;