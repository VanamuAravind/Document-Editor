import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Table from './components/Table';
import FileWindow from './components/FileWindow'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
    {/* <Table/> */}
    {/* <FileWindow/> */}
  </React.StrictMode>
);

