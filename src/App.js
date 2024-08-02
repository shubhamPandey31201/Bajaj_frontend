import React from 'react';
import DataForm from './components/DataForm';
import './App.css';

const App = () => {
  document.title = "ABCD123"; 

  return (
    <div className="App">
      <header className="App-header">
        <DataForm />
      </header>
    </div>
  );
};

export default App;