import React from 'react';

/* Styling */
import './App.scss';

/* Child Components */
import HeroboxContent from "./components/HeroboxContent";
import SignUpForm from "./components/SignUpForm";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <main className="app">
        <div className="herobox">
          <HeroboxContent/>
          <SignUpForm/>
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default App;
