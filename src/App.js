import React from 'react';
import './App.css';
import 'w3-css/w3.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Head from "./components/header";
import calendrier from "./components/calendrier";
import home from './components/home'

import { Route, withRouter } from "react-router-dom";

function App() {
  return (
    <div >
      <Head />
      <Route
        path="/home"  
        component={home}
      />
      <Route
        path="/calendrier"  
        component={calendrier}
      />
    </div>
  );
}

export default withRouter(App);